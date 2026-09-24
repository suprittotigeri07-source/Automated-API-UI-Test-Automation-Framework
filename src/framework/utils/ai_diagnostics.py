"""AI-assisted Failure Diagnostics and Automated Root-Cause Analysis."""

import re
from typing import Any


class AIFailureAnalyzer:
    """Provides automated failure summarization and remediation recommendations."""

    @staticmethod
    def analyze_failure(
        test_name: str,
        error_message: str,
        stack_trace: str,
        recent_logs: list[str] | None = None,
        screenshot_path: str | None = None,
    ) -> dict[str, Any]:
        """Perform heuristic root-cause diagnosis on test failure data."""
        probable_cause = "General execution assertion or runtime exception."
        recommended_action = "Inspect assertion message and test data."

        # Heuristic matching for common automation issues
        if "TimeoutError" in error_message or "timed out" in error_message.lower():
            probable_cause = (
                "Element wait timeout or network read timeout exceeded configured threshold."
            )
            recommended_action = (
                "Verify selector visibility, increase timeout configuration, "
                "or confirm target endpoint/page is reachable."
            )
        elif "ConnectionResetError" in error_message or "Connection aborted" in error_message:
            probable_cause = (
                "Remote server forcibly closed TCP connection (possible rate limit or reset)."
            )
            recommended_action = (
                "Verify retry policy with exponential backoff and rate limit ceilings."
            )
        elif "404" in error_message:
            probable_cause = "Target API endpoint or resource ID was not found."
            recommended_action = (
                "Verify endpoint path spelling, query parameters, or resource lifecycle."
            )
        elif "AssertionError" in error_message:
            # Extract expected vs actual
            match = re.search(r"assert (.*)", error_message)
            probable_cause = f"Assertion mismatch: {match.group(1) if match else error_message}"
            recommended_action = (
                "Verify business logic contract and ensure response data matches expectation."
            )

        diagnosis = {
            "test_name": test_name,
            "probable_cause": probable_cause,
            "recommended_action": recommended_action,
            "error_snippet": error_message.strip()[:300],
            "screenshot_attached": bool(screenshot_path),
            "screenshot_path": screenshot_path,
            "recent_logs_count": len(recent_logs) if recent_logs else 0,
        }
        return diagnosis

    @staticmethod
    def format_diagnostic_prompt(diagnosis: dict[str, Any]) -> str:
        """Format diagnosis as a prompt for AI model assistance."""
        return (
            f"### Automated Failure Diagnosis for `{diagnosis['test_name']}`\n\n"
            f"**Probable Cause:** {diagnosis['probable_cause']}\n\n"
            f"**Recommended Action:** {diagnosis['recommended_action']}\n\n"
            f"**Error Details:**\n```\n{diagnosis['error_snippet']}\n```\n"
        )
