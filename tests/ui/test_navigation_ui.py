"""UI navigation and page verification test cases."""

from pathlib import Path

import pytest
from playwright.sync_api import Page

from framework.ui.base_page import BasePage


@pytest.mark.ui
@pytest.mark.smoke
def test_home_page_navigation(page: Page) -> None:
    """Verify navigation to root application URL and title validation."""
    base_page = BasePage(page)
    base_page.navigate("/")

    assert "The Internet" in base_page.get_title()
    assert base_page.is_visible("h1.heading")


@pytest.mark.ui
@pytest.mark.regression
def test_screenshot_generation(page: Page) -> None:
    """Verify screenshot capture helper stores image file on disk."""
    base_page = BasePage(page)
    base_page.navigate("/")

    screenshot_path = base_page.take_screenshot("test_home_view")
    assert Path(screenshot_path).exists()
    assert Path(screenshot_path).stat().st_size > 0
