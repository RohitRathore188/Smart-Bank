from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from typing import Optional, List, Dict, Any

from app.infrastructure.external.gemini_client import GeminiAIClient
from app.presentation.dependencies import get_current_user
from app.domain.entities.user import UserEntity

router = APIRouter(prefix="/ai", tags=["Gemini AI Intelligence Engine"])
gemini_client = GeminiAIClient()

class ChatRequest(BaseModel):
    message: str
    context: Optional[Dict[str, Any]] = None

class FraudCheckRequest(BaseModel):
    amount: float
    merchant: str
    location: str

class TransactionExplainRequest(BaseModel):
    transaction_id: str
    merchant: str
    amount: float

@router.post("/chat")
async def chat_with_gemini(req: ChatRequest, current_user: UserEntity = Depends(get_current_user)):
    try:
        res = await gemini_client.generate_financial_advice(req.message, req.context)
        return {"success": True, "data": res}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.post("/fraud-score")
async def evaluate_fraud(req: FraudCheckRequest, current_user: UserEntity = Depends(get_current_user)):
    res = await gemini_client.evaluate_fraud_risk(req.amount, req.merchant, req.location)
    return {"success": True, "data": res}

@router.post("/explain-transaction")
async def explain_transaction(req: TransactionExplainRequest, current_user: UserEntity = Depends(get_current_user)):
    explanation = await gemini_client.explain_transaction(req.transaction_id, req.merchant, req.amount)
    return {"success": True, "data": {"explanation": explanation}}
