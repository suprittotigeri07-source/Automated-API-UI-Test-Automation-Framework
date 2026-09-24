"""Sample verification test to validate PyTest configuration and discovery."""

import pytest


@pytest.mark.unit
@pytest.mark.smoke
def test_framework_initialization(sample_fixture: str) -> None:
    """Verify basic PyTest execution and fixture injection."""
    assert sample_fixture == "pytest_initialized"


@pytest.mark.unit
def test_basic_arithmetic() -> None:
    """Verify PyTest assertion handling."""
    assert 1 + 1 == 2
