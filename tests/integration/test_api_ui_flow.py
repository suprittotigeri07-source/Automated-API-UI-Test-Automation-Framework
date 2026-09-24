"""Integration test suite validating end-to-end API and UI workflows."""

import pytest

from framework.api.services.user_service import UserService
from framework.reporting.analytics import TestAnalyticsCollector
from framework.ui.pages.login_page import LoginPage
from framework.utils.ai_diagnostics import AIFailureAnalyzer
from framework.utils.helpers import generate_random_email, generate_random_string


@pytest.mark.integration
@pytest.mark.smoke
def test_hybrid_api_and_ui_workflow(user_service: UserService, login_page: LoginPage) -> None:
    """Validate integrated execution of API creation and UI interaction."""
    # Step 1: Execute API action (create user via UserService)
    test_user_name = f"IntegratedUser_{generate_random_string(4)}"
    test_username = f"integ_{generate_random_string(4).lower()}"
    test_email = generate_random_email()

    api_resp = user_service.create_user(
        name=test_user_name,
        username=test_username,
        email=test_email,
    )
    api_resp.assert_status_code(201)
    user_data = api_resp.json()
    assert user_data["name"] == test_user_name

    # Step 2: Execute UI action (verify Login page UI components)
    login_page.open()
    assert login_page.is_login_button_visible()


@pytest.mark.unit
def test_analytics_and_ai_diagnostics() -> None:
    """Verify analytics tracking and automated AI failure analysis."""
    collector = TestAnalyticsCollector(history_file="reports/test_analytics.json")
    collector.record_test("sample_test_success", "passed", 0.123)
    collector.record_test(
        "sample_test_failure", "failed", 0.456, error_message="TimeoutError: element not found"
    )

    summary = collector.generate_summary()
    assert summary["metrics"]["total_tests"] == 2
    assert summary["metrics"]["passed"] == 1
    assert summary["metrics"]["failed"] == 1

    # Verify AI diagnostic analyzer
    diagnosis = AIFailureAnalyzer.analyze_failure(
        test_name="sample_test_failure",
        error_message="TimeoutError: element not found in 15000ms",
        stack_trace="Traceback...",
    )
    assert "timeout" in diagnosis["probable_cause"].lower()
    prompt = AIFailureAnalyzer.format_diagnostic_prompt(diagnosis)
    assert "Automated Failure Diagnosis" in prompt
