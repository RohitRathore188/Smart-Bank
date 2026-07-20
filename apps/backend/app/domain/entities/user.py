from dataclasses import dataclass, field
from datetime import datetime
from enum import Enum
from typing import List, Optional
import uuid

class UserRole(str, Enum):
    RETAIL_USER = "RETAIL_USER"
    BUSINESS_EMPLOYEE = "BUSINESS_EMPLOYEE"
    BUSINESS_CFO = "BUSINESS_CFO"
    COMPLIANCE_AUDITOR = "COMPLIANCE_AUDITOR"
    SUPER_ADMIN = "SUPER_ADMIN"

class AccountStatus(str, Enum):
    PENDING_VERIFICATION = "PENDING_VERIFICATION"
    ACTIVE = "ACTIVE"
    SUSPENDED = "SUSPENDED"
    BLOCKED = "BLOCKED"

@dataclass
class UserEntity:
    id: uuid.UUID
    tenant_id: uuid.UUID
    email: str
    hashed_password: str
    first_name: str
    last_name: str
    roles: List[UserRole] = field(default_factory=lambda: [UserRole.RETAIL_USER])
    status: AccountStatus = AccountStatus.PENDING_VERIFICATION
    is_email_verified: bool = False
    mfa_enabled: bool = False
    verification_token: Optional[str] = None
    reset_password_token: Optional[str] = None
    reset_password_expires_at: Optional[datetime] = None
    created_at: datetime = field(default_factory=datetime.utcnow)
    updated_at: datetime = field(default_factory=datetime.utcnow)

    def verify_email(self):
        self.is_email_verified = True
        self.verification_token = None
        self.status = AccountStatus.ACTIVE
        self.updated_at = datetime.utcnow()

    def set_reset_token(self, token: str, expires_at: datetime):
        self.reset_password_token = token
        self.reset_password_expires_at = expires_at
        self.updated_at = datetime.utcnow()

    def update_password(self, new_hashed_password: str):
        self.hashed_password = new_hashed_password
        self.reset_password_token = None
        self.reset_password_expires_at = None
        self.updated_at = datetime.utcnow()
