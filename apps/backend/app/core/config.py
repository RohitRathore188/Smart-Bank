from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List, Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "SmartBank India AI"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    ENVIRONMENT: str = "development"
    PORT: int = 8000
    
    # Database
    DATABASE_URL: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/smartbank"
    
    # Security
    JWT_SECRET_KEY: str = "super_secret_jwt_key_change_in_production_32bytes_min"
    JWT_REFRESH_SECRET_KEY: str = "super_secret_refresh_jwt_key_change_in_production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 15
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    
    # Supabase Credentials
    SUPABASE_URL: Optional[str] = "https://ldlrzvayqxstmvlxaepi.supabase.co"
    SUPABASE_PUBLISHABLE_KEY: Optional[str] = None
    SUPABASE_SECRET_KEY: Optional[str] = None
    SUPABASE_JWKS_URL: Optional[str] = None
    
    # AI Credentials
    GEMINI_API_KEY: Optional[str] = "AIzaSy_mock_gemini_key_for_development"
    
    # CORS
    BACKEND_CORS_ORIGINS: List[str] = ["http://localhost:5173", "http://127.0.0.1:5173", "https://smartbank.vercel.app"]
    
    # Configure Pydantic v2 Settings to ignore extra environment variables
    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore",
        case_sensitive=True
    )

settings = Settings()
