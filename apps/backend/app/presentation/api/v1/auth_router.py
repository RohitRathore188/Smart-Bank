from fastapi import APIRouter, HTTPException, status, Depends

from app.application.dtos.auth_dtos import (
    RegisterRequest, LoginRequest, TokenResponse, UserDTO,
    ForgotPasswordRequest, ResetPasswordRequest, VerifyEmailRequest,
    RefreshTokenRequest, MessageResponse
)
from app.application.services.auth_service import AuthService
from app.presentation.dependencies import get_current_user, require_roles
from app.domain.entities.user import UserEntity

router = APIRouter(prefix="/auth", tags=["Authentication & Identity"])
auth_service = AuthService()

@router.post("/register", response_model=UserDTO, status_code=status.HTTP_201_CREATED)
async def register(req: RegisterRequest):
    try:
        return await auth_service.register(req)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

@router.post("/login", response_model=TokenResponse)
async def login(req: LoginRequest):
    try:
        return await auth_service.login(req)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=str(e))

@router.post("/refresh", response_model=TokenResponse)
async def refresh_token(req: RefreshTokenRequest):
    try:
        return await auth_service.refresh_access_token(req.refresh_token)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=str(e))

@router.post("/forgot-password", response_model=MessageResponse)
async def forgot_password(req: ForgotPasswordRequest):
    msg = await auth_service.forgot_password(req)
    return MessageResponse(message=msg)

@router.post("/reset-password", response_model=MessageResponse)
async def reset_password(req: ResetPasswordRequest):
    try:
        msg = await auth_service.reset_password(req)
        return MessageResponse(message=msg)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

@router.post("/verify-email", response_model=UserDTO)
async def verify_email(req: VerifyEmailRequest):
    try:
        return await auth_service.verify_email(req)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

@router.get("/me", response_model=UserDTO)
async def get_current_user_profile(current_user: UserEntity = Depends(get_current_user)):
    return auth_service._map_to_dto(current_user)

@router.get("/admin-only-test", response_model=MessageResponse)
async def admin_only_test(current_user: UserEntity = Depends(require_roles(["SUPER_ADMIN", "BUSINESS_CFO"]))):
    return MessageResponse(message=f"Access granted to elevated user {current_user.email}")
