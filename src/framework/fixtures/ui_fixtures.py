"""Playwright UI browser and page fixtures."""

import os
from collections.abc import Generator
from pathlib import Path

import pytest
from playwright.sync_api import Browser, BrowserContext, Page, Playwright, sync_playwright

from framework.config.settings import get_settings
from framework.ui.pages.dashboard_page import DashboardPage
from framework.ui.pages.login_page import LoginPage
from framework.utils.logger import get_logger

logger = get_logger("framework.ui.fixtures")


@pytest.fixture(scope="session")
def playwright_instance() -> Generator[Playwright, None, None]:
    """Provide session-level Playwright manager instance."""
    settings = get_settings()
    # Ensure Playwright finds browser binaries if installed in custom path
    if settings.playwright_browsers_path:
        os.environ["PLAYWRIGHT_BROWSERS_PATH"] = settings.playwright_browsers_path

    with sync_playwright() as p:
        yield p


@pytest.fixture(scope="session")
def browser_instance(playwright_instance: Playwright) -> Generator[Browser, None, None]:
    """Provide session-level Browser instance."""
    settings = get_settings()
    browser_type = getattr(playwright_instance, settings.browser, playwright_instance.chromium)
    browser = browser_type.launch(
        headless=settings.headless,
        slow_mo=settings.slow_mo if settings.slow_mo > 0 else None,
    )
    logger.info(f"Launched {settings.browser} browser (headless={settings.headless})")
    yield browser
    browser.close()
    logger.info("Closed browser session")


@pytest.fixture
def browser_context(browser_instance: Browser) -> Generator[BrowserContext, None, None]:
    """Provide isolated function-level browser context."""
    context = browser_instance.new_context(
        viewport={"width": 1280, "height": 720},
        ignore_https_errors=True,
    )
    yield context
    context.close()


@pytest.fixture
def page(
    browser_context: BrowserContext, request: pytest.FixtureRequest
) -> Generator[Page, None, None]:
    """Provide isolated Page instance with automatic screenshot on failure."""
    page_instance = browser_context.new_page()
    yield page_instance

    # Failure diagnostics
    settings = get_settings()
    if settings.screenshot_on_failure:
        node = request.node
        # Check if test failed
        rep_call = getattr(node, "rep_call", None)
        if rep_call and rep_call.failed:
            screenshot_dir = Path("screenshots")
            screenshot_dir.mkdir(parents=True, exist_ok=True)
            test_name = node.name.replace("/", "_").replace("::", "_")
            screenshot_file = screenshot_dir / f"failure_{test_name}.png"
            try:
                page_instance.screenshot(path=str(screenshot_file))
                logger.error(f"Test failed. Saved failure screenshot: {screenshot_file}")
            except Exception as e:
                logger.warning(f"Could not capture failure screenshot: {e}")

    page_instance.close()


@pytest.fixture
def login_page(page: Page) -> LoginPage:
    """Provide LoginPage instance."""
    return LoginPage(page)


@pytest.fixture
def dashboard_page(page: Page) -> DashboardPage:
    """Provide DashboardPage instance."""
    return DashboardPage(page)
