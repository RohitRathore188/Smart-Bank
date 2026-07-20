from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    PROJECT_NAME: str = "SmartBank AI"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # Database
    DATABASE_URL: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/smartbank"
    
    # Security
    JWT_SECRET_KEY: str = "super_secret_jwt_key_change_in_production_32bytes_min"
    JWT_REFRESH_SECRET_KEY: str = "super_secret_refresh_jwt_key_change_in_production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 15
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    
    # CORS
    BACKEND_CORS_ORIGINS: List[str] = ["http://localhost:5173", "https://smartbank.vercel.app"]
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
