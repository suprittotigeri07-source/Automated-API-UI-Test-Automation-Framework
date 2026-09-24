"""General framework helper functions and timing utilities."""

import random
import string
import time
from collections.abc import Generator
from contextlib import contextmanager
from typing import Any


@contextmanager
def measure_time() -> Generator[dict[str, float], None, None]:
    """Context manager measuring execution duration in milliseconds."""
    timing_data: dict[str, float] = {"duration_ms": 0.0}
    start = time.perf_counter()
    try:
        yield timing_data
    finally:
        end = time.perf_counter()
        timing_data["duration_ms"] = round((end - start) * 1000.0, 2)


def sanitize_data(data: Any) -> Any:
    """Recursively mask sensitive values in dict or list payloads."""
    sensitive_keys = {"password", "token", "secret", "authorization", "api_key", "access_token"}

    if isinstance(data, dict):
        sanitized: dict[str, Any] = {}
        for key, value in data.items():
            if any(s in key.lower() for s in sensitive_keys):
                sanitized[key] = "********"
            elif isinstance(value, (dict, list)):
                sanitized[key] = sanitize_data(value)
            else:
                sanitized[key] = value
        return sanitized
    if isinstance(data, list):
        return [sanitize_data(item) for item in data]
    return data


def generate_random_string(length: int = 8) -> str:
    """Generate a random alphanumeric string."""
    return "".join(random.choices(string.ascii_letters + string.digits, k=length))


def generate_random_email(domain: str = "example.com") -> str:
    """Generate a random email address for test data isolation."""
    return f"test_{generate_random_string(6).lower()}@{domain}"
