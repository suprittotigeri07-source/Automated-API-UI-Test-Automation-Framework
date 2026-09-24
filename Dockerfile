# Multi-stage production test runner Dockerfile
FROM python:3.11-slim

# Prevent Python from writing .pyc and buffer stdout/stderr
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright

WORKDIR /app

# Install system dependencies needed for Playwright and networking
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    git \
    libnss3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdrm2 \
    libxkbcommon0 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    libgbm1 \
    libpango-1.0-0 \
    libcairo2 \
    libasound2 \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Install Playwright browser binaries
RUN python -m playwright install --with-deps chromium

# Copy framework source and tests
COPY pyproject.toml pytest.ini .env.example ./
COPY conftest.py ./
COPY src/ ./src/
COPY tests/ ./tests/

# Default execution: run full test suite with HTML reporting
CMD ["pytest", "--html=reports/report.html", "--self-contained-html", "--alluredir=reports/allure-results"]
