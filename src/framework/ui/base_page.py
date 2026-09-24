"""Base Page Object encapsulation for Playwright browser interactions."""

from pathlib import Path

from playwright.sync_api import Locator, Page, Response

from framework.config.settings import get_settings
from framework.utils.logger import get_logger

logger = get_logger("framework.ui")


class BasePage:
    """Foundational Page Object with robust waits, logging, and error handling."""

    def __init__(self, page: Page) -> None:
        self.page = page
        self.settings = get_settings()
        self.page.set_default_timeout(self.settings.ui_timeout)

    def navigate(self, path: str = "") -> Response | None:
        """Navigate to relative or absolute URL."""
        if path.startswith("http://") or path.startswith("https://"):
            full_url = path
        else:
            base = self.settings.base_ui_url.rstrip("/")
            endpoint = path.lstrip("/")
            full_url = f"{base}/{endpoint}" if endpoint else base

        logger.info(f"Navigating to URL: {full_url}")
        return self.page.goto(full_url, wait_until="domcontentloaded")

    def get_title(self) -> str:
        """Retrieve page title."""
        return self.page.title()

    def get_current_url(self) -> str:
        """Retrieve current browser URL."""
        return self.page.url

    def find_locator(self, selector: str) -> Locator:
        """Locate element on page."""
        return self.page.locator(selector)

    def click(self, selector: str) -> None:
        """Wait for element and click."""
        logger.info(f"Clicking element: {selector}")
        self.page.locator(selector).click()

    def fill(self, selector: str, text: str) -> None:
        """Fill input field with text (sanitized in logs if sensitive)."""
        logger.info(f"Filling input: {selector}")
        self.page.locator(selector).fill(text)

    def get_text(self, selector: str) -> str:
        """Get visible inner text of element."""
        return self.page.locator(selector).inner_text().strip()

    def is_visible(self, selector: str, timeout: int | None = None) -> bool:
        """Check element visibility within specified timeout."""
        try:
            return self.page.locator(selector).is_visible(timeout=timeout or 5000)
        except Exception:
            return False

    def wait_for_url_contains(self, partial_url: str, timeout: int | None = None) -> None:
        """Wait until current URL contains expected substring."""
        effective_timeout = timeout or self.settings.ui_timeout
        self.page.wait_for_url(lambda url: partial_url in url, timeout=effective_timeout)

    def take_screenshot(self, name: str) -> str:
        """Capture screenshot and store in screenshots directory."""
        screenshot_dir = Path("screenshots")
        screenshot_dir.mkdir(parents=True, exist_ok=True)
        screenshot_path = str(screenshot_dir / f"{name}.png")
        self.page.screenshot(path=screenshot_path)
        logger.info(f"Captured screenshot: {screenshot_path}")
        return screenshot_path
