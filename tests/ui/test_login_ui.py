"""UI tests for Authentication flows using Page Object Model."""

import pytest

from framework.config.settings import get_settings
from framework.ui.pages.dashboard_page import DashboardPage
from framework.ui.pages.login_page import LoginPage


@pytest.mark.ui
@pytest.mark.smoke
def test_valid_login_and_logout(login_page: LoginPage, dashboard_page: DashboardPage) -> None:
    """Verify user can authenticate successfully with valid credentials and log out."""
    settings = get_settings()

    # Step 1: Open login page
    login_page.open()
    assert login_page.is_login_button_visible()

    # Step 2: Perform login
    login_page.login(settings.auth_username, settings.auth_password)

    # Step 3: Assert dashboard presence and notifications
    assert dashboard_page.is_loaded()
    assert "Secure Area" in dashboard_page.get_header_text()
    assert dashboard_page.is_logout_button_visible()

    # Step 4: Perform logout
    dashboard_page.logout()
    assert login_page.is_login_button_visible()


@pytest.mark.ui
@pytest.mark.regression
def test_invalid_login_shows_error(login_page: LoginPage) -> None:
    """Verify invalid credentials display appropriate error notification."""
    login_page.open()
    login_page.login("wrong_username", "wrong_password_123")

    flash_text = login_page.get_flash_message()
    assert "Your username is invalid!" in flash_text


@pytest.mark.ui
@pytest.mark.regression
def test_empty_credentials_shows_error(login_page: LoginPage) -> None:
    """Verify submitting empty credentials triggers validation error."""
    login_page.open()
    login_page.login("", "")

    flash_text = login_page.get_flash_message()
    assert "Your username is invalid!" in flash_text
