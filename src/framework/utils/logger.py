"""Centralized logging utility with sensitive data masking."""

import logging
import os
import re
from pathlib import Path

# Sensitive keys to mask in log messages
SENSITIVE_PATTERNS = [
    (
        re.compile(
            r'(["\']?(?:password|token|secret|authorization|api_key|access_token)["\']?\s*[:=]\s*["\'])([^"\']+)(["\'])',
            re.IGNORECASE,
        ),
        r"\1********\3",
    ),
    (re.compile(r"(Bearer\s+)([A-Za-z0-9_\-\.]+)", re.IGNORECASE), r"\1********"),
]


class MaskingFormatter(logging.Formatter):
    """Log formatter that automatically masks sensitive information."""

    def format(self, record: logging.LogRecord) -> str:
        original = super().format(record)
        masked = original
        for pattern, replacement in SENSITIVE_PATTERNS:
            masked = pattern.sub(replacement, masked)
        return masked


def get_logger(name: str = "framework") -> logging.Logger:
    """Retrieve or configure a standardized logger instance."""
    logger = logging.getLogger(name)

    if not logger.handlers:
        log_level = os.getenv("LOG_LEVEL", "INFO").upper()
        logger.setLevel(getattr(logging, log_level, logging.INFO))

        # Console handler
        console_handler = logging.StreamHandler()
        formatter = MaskingFormatter(
            "%(asctime)s [%(levelname)8s] %(name)s: %(message)s",
            datefmt="%Y-%m-%d %H:%M:%S",
        )
        console_handler.setFormatter(formatter)
        logger.addHandler(console_handler)

        # File handler (logs/framework.log)
        log_dir = Path("logs")
        try:
            log_dir.mkdir(parents=True, exist_ok=True)
            file_handler = logging.FileHandler(log_dir / "framework.log", encoding="utf-8")
            file_handler.setFormatter(formatter)
            logger.addHandler(file_handler)
        except OSError:
            # Fall back gracefully if filesystem does not permit file logging
            pass

    return logger
