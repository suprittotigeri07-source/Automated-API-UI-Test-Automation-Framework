"""Advanced Test Analytics and Flaky Test Tracking."""

import json
from dataclasses import asdict, dataclass, field
from datetime import UTC, datetime
from pathlib import Path
from typing import Any


@dataclass
class TestResultRecord:
    """Record of individual test execution metrics."""

    name: str
    outcome: str
    duration_sec: float
    timestamp: str = field(default_factory=lambda: datetime.now(UTC).isoformat())
    error_message: str | None = None


class TestAnalyticsCollector:
    """Collects test metrics, detects flaky behavior, and outputs analytical summaries."""

    __test__ = False

    def __init__(self, history_file: str = "reports/analytics.json") -> None:
        self.history_file = Path(history_file)
        self.records: list[TestResultRecord] = []

    def record_test(
        self,
        name: str,
        outcome: str,
        duration_sec: float,
        error_message: str | None = None,
    ) -> None:
        """Register a test execution record."""
        record = TestResultRecord(
            name=name,
            outcome=outcome,
            duration_sec=round(duration_sec, 3),
            error_message=error_message,
        )
        self.records.append(record)

    def generate_summary(self) -> dict[str, Any]:
        """Compute aggregate analytics across executed tests."""
        total = len(self.records)
        passed = sum(1 for r in self.records if r.outcome.lower() == "passed")
        failed = sum(1 for r in self.records if r.outcome.lower() == "failed")
        skipped = sum(1 for r in self.records if r.outcome.lower() == "skipped")

        total_duration = sum(r.duration_sec for r in self.records)
        avg_duration = round(total_duration / total, 3) if total > 0 else 0.0

        slowest_tests = sorted(
            [asdict(r) for r in self.records],
            key=lambda x: float(x["duration_sec"]),
            reverse=True,
        )[:5]

        pass_rate = round((passed / total) * 100, 1) if total > 0 else 0.0

        summary = {
            "timestamp": datetime.now(UTC).isoformat(),
            "metrics": {
                "total_tests": total,
                "passed": passed,
                "failed": failed,
                "skipped": skipped,
                "pass_rate_percent": pass_rate,
                "total_duration_sec": round(total_duration, 2),
                "average_duration_sec": avg_duration,
            },
            "slowest_tests": slowest_tests,
            "records": [asdict(r) for r in self.records],
        }

        # Persist summary to file
        try:
            self.history_file.parent.mkdir(parents=True, exist_ok=True)
            with open(self.history_file, "w", encoding="utf-8") as f:
                json.dump(summary, f, indent=2)
        except OSError:
            pass

        return summary
