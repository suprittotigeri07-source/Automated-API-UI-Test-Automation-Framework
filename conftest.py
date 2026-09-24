"""Root PyTest configuration and shared fixtures."""

import logging
from collections.abc import Generator
from typing import Any

import pytest

logger = logging.getLogger(__name__)

# Register framework fixture plugins
pytest_plugins = [
    "framework.fixtures.api_fixtures",
    "framework.fixtures.ui_fixtures",
]


@pytest.hookimpl(tryfirst=True, hookwrapper=True)
def pytest_runtest_makereport(
    item: pytest.Item, call: pytest.CallInfo[None]
) -> Generator[None, Any, None]:
    """Capture test execution result on test item for failure diagnostics."""
    outcome = yield
    rep = outcome.get_result()
    setattr(item, f"rep_{rep.when}", rep)


@pytest.fixture(scope="session", autouse=True)
def session_setup() -> Generator[None, None, None]:
    """Session level setup and teardown fixture."""
    logger.info("Initializing Test Suite Session")
    yield
    logger.info("Completing Test Suite Session")


@pytest.fixture
def sample_fixture() -> str:
    """Sample fixture to verify PyTest dependency injection."""
    return "pytest_initialized"
