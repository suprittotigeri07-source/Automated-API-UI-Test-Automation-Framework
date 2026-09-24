"""Framework configuration settings loader and validator."""

import os
from functools import lru_cache
from pathlib import Path

from dotenv import load_dotenv
from pydantic import BaseModel, Field

# Load .env from project root if present
PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent.parent
load_dotenv(PROJECT_ROOT / ".env")


class Settings(BaseModel):
    """Strongly typed framework settings with fallback defaults."""

    # API Configuration
    base_api_url: str = Field(
        default_factory=lambda: os.getenv("BASE_API_URL", "https://jsonplaceholder.typicode.com")
    )
    api_timeout: float = Field(default_factory=lambda: float(os.getenv("API_TIMEOUT", "30.0")))

    # UI Configuration
    base_ui_url: str = Field(
        default_factory=lambda: os.getenv("BASE_UI_URL", "https://the-internet.herokuapp.com")
    )
    browser: str = Field(default_factory=lambda: os.getenv("BROWSER", "chromium").lower())
    headless: bool = Field(
        default_factory=lambda: os.getenv("HEADLESS", "true").lower() in ("true", "1", "yes")
    )
    ui_timeout: int = Field(default_factory=lambda: int(os.getenv("UI_TIMEOUT", "15000")))
    slow_mo: int = Field(default_factory=lambda: int(os.getenv("SLOW_MO", "0")))
    playwright_browsers_path: str = Field(
        default_factory=lambda: os.getenv(
            "PLAYWRIGHT_BROWSERS_PATH", str(PROJECT_ROOT / ".browsers")
        )
    )

    # Execution & Reporting
    env: str = Field(default_factory=lambda: os.getenv("ENV", "local"))
    log_level: str = Field(default_factory=lambda: os.getenv("LOG_LEVEL", "INFO").upper())
    report_dir: str = Field(default_factory=lambda: os.getenv("REPORT_DIR", "reports"))
    screenshot_on_failure: bool = Field(
        default_factory=lambda: os.getenv("SCREENSHOT_ON_FAILURE", "true").lower()
        in ("true", "1", "yes")
    )

    # Auth Credentials
    auth_username: str = Field(default_factory=lambda: os.getenv("AUTH_USERNAME", "tomsmith"))
    auth_password: str = Field(
        default_factory=lambda: os.getenv("AUTH_PASSWORD", "SuperSecretPassword!")
    )
    auth_token: str = Field(default_factory=lambda: os.getenv("AUTH_TOKEN", ""))


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    """Return a cached singleton instance of framework Settings."""
    return Settings()
