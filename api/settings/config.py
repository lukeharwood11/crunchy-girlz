# configure environment variables to be parsed into an AppConfig
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field


class AppConfig(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env", env_file_encoding="utf-8", extra="ignore"
    )

    # API Keys
    OPENAI_API_KEY: str = Field(default="")

    # Supabase Configuration
    SUPABASE_URL: str = Field(default="")
    SUPABASE_ANON_KEY: str = Field(default="")
    SUPABASE_SERVICE_ROLE_KEY: str = Field(default="")

    # OAuth Configuration
    GOOGLE_CLIENT_ID: str = Field(default="")
    GOOGLE_CLIENT_SECRET: str = Field(default="")

    # App Configuration
    DEBUG: bool = Field(default=False)


config = AppConfig()
