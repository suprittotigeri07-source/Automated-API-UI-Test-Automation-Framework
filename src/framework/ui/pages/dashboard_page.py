"""Page Object for Authenticated Dashboard / Secure Area."""

from playwright.sync_api import Page

from framework.ui.base_page import BasePage


class DashboardPage(BasePage):
    """Encapsulates authenticated dashboard and secure area interactions."""

    URL_PATH = "/secure"

    # Selectors
    HEADER = "h2"
    SUBHEADER = "h4.subheader"
    LOGOUT_BUTTON = "a[href='/logout']"
    FLASH_MESSAGE = "div#flash"

    def __init__(self, page: Page) -> None:
        super().__init__(page)

    def is_loaded(self) -> bool:
        """Verify the dashboard page has loaded."""
        return self.is_visible(self.HEADER)

    def get_header_text(self) -> str:
        """Retrieve main header text."""
        return self.get_text(self.HEADER)

    def logout(self) -> None:
        """Click logout button."""
        self.click(self.LOGOUT_BUTTON)

    def is_logout_button_visible(self) -> bool:
        """Verify presence of logout button."""
        return self.is_visible(self.LOGOUT_BUTTON)
