"""Page Object for Authentication and Login view."""

from playwright.sync_api import Page

from framework.ui.base_page import BasePage


class LoginPage(BasePage):
    """Encapsulates locators and user interactions for the Login page."""

    URL_PATH = "/login"

    # Selectors
    USERNAME_INPUT = "input#username"
    PASSWORD_INPUT = "input#password"
    LOGIN_BUTTON = "button[type='submit']"
    FLASH_MESSAGE = "div#flash"

    def __init__(self, page: Page) -> None:
        super().__init__(page)

    def open(self) -> None:
        """Navigate directly to login page."""
        self.navigate(self.URL_PATH)

    def login(self, username: str, password: str) -> None:
        """Fill login credentials and submit the form."""
        self.fill(self.USERNAME_INPUT, username)
        self.fill(self.PASSWORD_INPUT, password)
        self.click(self.LOGIN_BUTTON)

    def get_flash_message(self) -> str:
        """Retrieve flash alert notification text."""
        return self.get_text(self.FLASH_MESSAGE)

    def is_login_button_visible(self) -> bool:
        """Verify login button is present and visible."""
        return self.is_visible(self.LOGIN_BUTTON)
