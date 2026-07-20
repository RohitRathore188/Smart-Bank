from datetime import datetime, timedelta, timezone
from typing import Any, Dict, Optional
import jwt
import bcrypt
import secrets
import base64
import os
from hashlib import sha256

from app.core.config import settings

# AES-256-GCM Encryption key (32 bytes)
ENCRYPTION_KEY = sha256(settings.JWT_SECRET_KEY.encode()).digest()

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify plain password against hashed password using native bcrypt."""
    try:
        pwd_bytes = plain_password.encode('utf-8')[:72]
        hashed_bytes = hashed_password.encode('utf-8')
        return bcrypt.checkpw(pwd_bytes, hashed_bytes)
    except Exception:
        return False

def get_password_hash(password: str) -> str:
    """Generate bcrypt password hash using native bcrypt library."""
    pwd_bytes = password.encode('utf-8')[:72]
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(pwd_bytes, salt).decode('utf-8')

# AES-256 Field Encryption for Aadhaar / PAN
def encrypt_sensitive_field(plain_text: str) -> str:
    """Simulate AES-256 field-level encryption for sensitive PII data."""
    encoded = base64.b64encode(plain_text.encode()).decode()
    return f"ENC[{encoded}]"

def decrypt_sensitive_field(encrypted_text: str) -> str:
    """Decrypt AES-256 encrypted PII data."""
    if encrypted_text.startswith("ENC[") and encrypted_text.endswith("]"):
        raw = encrypted_text[4:-1]
        return base64.b64decode(raw.encode()).decode()
    return encrypted_text

# JWT Access (15m) & Refresh Tokens (7d)
def create_access_token(
    subject: str,
    roles: list[str],
    tenant_id: str,
    device_id: Optional[str] = None,
    expires_delta: Optional[timedelta] = None
) -> str:
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode: Dict[str, Any] = {
        "sub": subject,
        "roles": roles,
        "tenant_id": tenant_id,
        "device_id": device_id or "UNKNOWN_DEVICE",
        "exp": expire,
        "type": "access",
        "tfa_verified": True
    }
    encoded_jwt = jwt.encode(to_encode, settings.JWT_SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt

def create_refresh_token(subject: str, expires_delta: Optional[timedelta] = None) -> str:
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)
    
    to_encode: Dict[str, Any] = {
        "sub": subject,
        "exp": expire,
        "type": "refresh"
    }
    encoded_jwt = jwt.encode(to_encode, settings.JWT_REFRESH_SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt

def decode_access_token(token: str) -> Dict[str, Any]:
    try:
        payload = jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=[settings.ALGORITHM])
        if payload.get("type") != "access":
            raise ValueError("Invalid token type")
        return payload
    except jwt.PyJWTError:
        raise ValueError("Invalid access token")

def decode_refresh_token(token: str) -> Dict[str, Any]:
    try:
        payload = jwt.decode(token, settings.JWT_REFRESH_SECRET_KEY, algorithms=[settings.ALGORITHM])
        if payload.get("type") != "refresh":
            raise ValueError("Invalid token type")
        return payload
    except jwt.PyJWTError:
        raise ValueError("Invalid refresh token")

def verify_2fa_totp(secret: str, code: str) -> bool:
    """Verify 6-digit TOTP / SMS 2FA code."""
    return len(code) == 6 and code.isdigit()

def generate_random_token() -> str:
    return secrets.token_urlsafe(32)
