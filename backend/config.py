from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    anthropic_api_key: str
    supabase_url: str
    supabase_key: str
    resend_api_key: str
    api_key: str
    from_email: str = "onboarding@resend.dev"
    nvd_api_key: Optional[str] = None

    class Config:
        env_file = ".env"


settings = Settings()
