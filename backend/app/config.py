"""
Neural Arena - Configuration
Centralized settings and environment variable management.
"""

from functools import lru_cache
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""
    
    # API Settings
    app_name: str = "Neural Arena"
    app_version: str = "1.0.0"
    app_description: str = "The AI-Powered 'Who Would Win?' Simulator"
    api_v1_prefix: str = "/api/v1"
    debug: bool = False
    
    # CORS Settings
    cors_origins: list[str] = [
        "http://localhost:3000",      # Next.js dev server
        "http://127.0.0.1:3000",
        "http://localhost:5173",      # Vite dev server (if needed)
    ]
    cors_allow_credentials: bool = True
    cors_allow_methods: list[str] = ["GET", "POST", "OPTIONS"]
    cors_allow_headers: list[str] = ["*"]
    
    # Server Settings
    host: str = "0.0.0.0"
    port: int = 8000
    
    # Future AI Model Settings (placeholders)
    openai_api_key: str = ""
    anthropic_api_key: str = ""
    vision_model: str = "mock"  # Options: "mock", "clip", "gpt4-vision"
    llm_model: str = "mock"     # Options: "mock", "gpt-4", "claude-3"
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = False


@lru_cache
def get_settings() -> Settings:
    """
    Get cached application settings.
    
    Uses lru_cache to ensure settings are only loaded once.
    """
    return Settings()


# Convenience exports
settings = get_settings()

