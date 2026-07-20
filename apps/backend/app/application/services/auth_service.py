from datetime import datetime, timedelta, timezone
from typing import Dict, Any, Optional
import uuid

from app.core import security
from app.domain.entities.user import UserEntity, UserRole, AccountStatus
from app.application.dtos.auth_dtos import (
    RegisterRequest, LoginRequest, TokenResponse, UserDTO,
    ForgotPasswordRequest, ResetPasswordRequest, VerifyEmailRequest
)

class InMemoryUserRepository:
    """Mock/InMemory repository for initial clean architecture demonstration."""
    def __init__(self):
        self._users_by_email: Dict[str, UserEntity] = {}
        self._users_by_id: Dict[uuid.UUID, UserEntity] = {}
        self._tokens: Dict[str, UserEntity] = {}

    async def get_by_email(self, email: str) -> Optional[UserEntity]:
        return self._users_by_email.get(email.lower())

    async def get_by_id(self, user_id: uuid.UUID) -> Optional[UserEntity]:
        return self._users_by_id.get(user_id)

    async def get_by_verification_token(self, token: str) -> Optional[UserEntity]:
        for user in self._users_by_email.values():
            if user.verification_token == token:
                return user
        return None

    async def get_by_reset_token(self, token: str) -> Optional[UserEntity]:
        for user in self._users_by_email.values():
            if user.reset_password_token == token:
                return user
        return None

    async def save(self, user: UserEntity) -> UserEntity:
        self._users_by_email[user.email.lower()] = user
        self._users_by_id[user.id] = user
        return user

# Global instance for mock persistence
user_repo = InMemoryUserRepository()

class AuthService:
    def __init__(self, repo: InMemoryUserRepository = user_repo):
        self.repo = repo

    async def register(self, req: RegisterRequest) -> UserDTO:
        existing_user = await self.repo.get_by_email(req.email)
        if existing_user:
            raise ValueError("User with this email already exists")

        user_id = uuid.uuid4()
        tenant_id = uuid.uuid4()
        hashed_pwd = security.get_password_hash(req.password)
        v_token = security.generate_random_token()

        role = UserRole.BUSINESS_CFO if req.account_type == "BUSINESS" else UserRole.RETAIL_USER

        user = UserEntity(
            id=user_id,
            tenant_id=tenant_id,
            email=req.email.lower(),
            hashed_password=hashed_pwd,
            first_name=req.first_name,
            last_name=req.last_name,
            roles=[role],
            status=AccountStatus.PENDING_VERIFICATION,
            verification_token=v_token
        )

        await self.repo.save(user)

        # In production: trigger background task to send verification email with v_token

        return self._map_to_dto(user)

    async def login(self, req: LoginRequest) -> TokenResponse:
        user = await self.repo.get_by_email(req.email)
        if not user or not security.verify_password(req.password, user.hashed_password):
            raise ValueError("Invalid credentials")

        if user.status == AccountStatus.BLOCKED or user.status == AccountStatus.SUSPENDED:
            raise ValueError("Account is restricted or blocked")

        roles_str = [r.value for r in user.roles]
        access_token = security.create_access_token(
            subject=str(user.id),
            roles=roles_str,
            tenant_id=str(user.tenant_id)
        )
        refresh_token = security.create_refresh_token(subject=str(user.id))

        return TokenResponse(
            access_token=access_token,
            refresh_token=refresh_token,
            user=self._map_to_dto(user)
        )

    async def refresh_access_token(self, refresh_token_str: str) -> TokenResponse:
        payload = security.decode_refresh_token(refresh_token_str)
        user_id_str = payload.get("sub")
        if not user_id_str:
            raise ValueError("Invalid refresh token payload")

        user = await self.repo.get_by_id(uuid.UUID(user_id_str))
        if not user:
            raise ValueError("User not found")

        roles_str = [r.value for r in user.roles]
        new_access_token = security.create_access_token(
            subject=str(user.id),
            roles=roles_str,
            tenant_id=str(user.tenant_id)
        )
        new_refresh_token = security.create_refresh_token(subject=str(user.id))

        return TokenResponse(
            access_token=new_access_token,
            refresh_token=new_refresh_token,
            user=self._map_to_dto(user)
        )

    async def forgot_password(self, req: ForgotPasswordRequest) -> str:
        user = await self.repo.get_by_email(req.email)
        if not user:
            # Silent return to prevent email enumeration
            return "If an account exists, a reset link has been dispatched."

        reset_token = security.generate_random_token()
        expires_at = datetime.now(timezone.utc) + timedelta(hours=1)
        user.set_reset_token(reset_token, expires_at)
        await self.repo.save(user)

        # In production: trigger email dispatch with reset_token
        return "Password reset link generated successfully."

    async def reset_password(self, req: ResetPasswordRequest) -> str:
        user = await self.repo.get_by_reset_token(req.token)
        if not user or not user.reset_password_expires_at:
            raise ValueError("Invalid or expired password reset token")

        if datetime.now(timezone.utc) > user.reset_password_expires_at.replace(tzinfo=timezone.utc):
            raise ValueError("Password reset token has expired")

        new_hashed_pwd = security.get_password_hash(req.new_password)
        user.update_password(new_hashed_pwd)
        await self.repo.save(user)

        return "Password has been successfully updated."

    async def verify_email(self, req: VerifyEmailRequest) -> UserDTO:
        user = await self.repo.get_by_verification_token(req.token)
        if not user:
            raise ValueError("Invalid verification token")

        user.verify_email()
        await self.repo.save(user)
        return self._map_to_dto(user)

    def _map_to_dto(self, user: UserEntity) -> UserDTO:
        return UserDTO(
            id=user.id,
            tenant_id=user.tenant_id,
            email=user.email,
            first_name=user.first_name,
            last_name=user.last_name,
            roles=[r.value for r in user.roles],
            status=user.status.value,
            is_email_verified=user.is_email_verified,
            mfa_enabled=user.mfa_enabled,
            created_at=user.created_at
        )
