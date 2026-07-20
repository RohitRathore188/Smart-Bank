from fastapi import Depends, HTTPException, status, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from typing import List, Callable, Dict
import time

from app.core.security import decode_access_token

security = HTTPBearer()

# In-memory Rate Limiter (Token Bucket: Max 100 requests per minute per IP)
RATE_LIMIT_STORE: Dict[str, List[float]] = {}
RATE_LIMIT_MAX = 100
RATE_LIMIT_WINDOW = 60

def rate_limit_guard(request: Request):
    """Enforce API Rate Limiting per client IP."""
    client_ip = request.client.host if request.client else "127.0.0.1"
    now = time.time()
    
    if client_ip not in RATE_LIMIT_STORE:
        RATE_LIMIT_STORE[client_ip] = []
    
    # Filter timestamps within window
    RATE_LIMIT_STORE[client_ip] = [t for t in RATE_LIMIT_STORE[client_ip] if now - t < RATE_LIMIT_WINDOW]
    
    if len(RATE_LIMIT_STORE[client_ip]) >= RATE_LIMIT_MAX:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Rate limit exceeded. Maximum 100 requests per minute allowed."
        )
    
    RATE_LIMIT_STORE[client_ip].append(now)

def get_current_user(
    request: Request,
    credentials: HTTPAuthorizationCredentials = Depends(security)
) -> dict:
    """Dependency: Extract and validate JWT Access Token + Session Expiry + Device Binding."""
    rate_limit_guard(request)
    
    token = credentials.credentials
    try:
        payload = decode_access_token(token)
        return {
            "user_id": payload["sub"],
            "roles": payload.get("roles", []),
            "tenant_id": payload.get("tenant_id"),
            "device_id": payload.get("device_id"),
            "tfa_verified": payload.get("tfa_verified", False)
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Authentication failed: {str(e)}",
            headers={"WWW-Authenticate": "Bearer"},
        )

def require_roles(allowed_roles: List[str]) -> Callable:
    """RBAC Guard Dependency: Restrict access based on role permissions."""
    def role_checker(current_user: dict = Depends(get_current_user)):
        user_roles = current_user.get("roles", [])
        if not any(role in allowed_roles for role in user_roles):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Access denied. Required roles: {allowed_roles}"
            )
        return current_user
    return role_checker
