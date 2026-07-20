from typing import List, Callable
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from app.core import security
from app.application.services.auth_service import AuthService, user_repo
from app.domain.entities.user import UserEntity

security_scheme = HTTPBearer()

async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security_scheme)
) -> UserEntity:
    token = credentials.credentials
    try:
        payload = security.decode_access_token(token)
        user_id_str = payload.get("sub")
        if not user_id_str:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token subject"
            )
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(e)
        )

    import uuid
    user = await user_repo.get_by_id(uuid.UUID(user_id_str))
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found or inactive"
        )
    return user

def require_roles(allowed_roles: List[str]) -> Callable:
    async def role_checker(current_user: UserEntity = Depends(get_current_user)) -> UserEntity:
        user_roles = [r.value for r in current_user.roles]
        has_role = any(role in allowed_roles for role in user_roles)
        if not has_role:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"User does not possess required permission roles ({allowed_roles})"
            )
        return current_user
    return role_checker
