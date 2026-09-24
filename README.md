# Automated API & UI Test Automation Framework

A production-grade Python automation framework for API and web UI testing using PyTest, Playwright, Docker and GitHub Actions.

---

## Overview

This project provides a reusable foundation for building automated API and UI tests.

The framework is designed around:

* Reusability
* Maintainability
* Test isolation
* Clear architecture
* CI/CD
* Docker
* Reporting
* Failure diagnostics

---

# Features

## API Automation

* GET
* POST
* PUT
* PATCH
* DELETE
* Authentication
* Request validation
* Response validation
* Status-code validation
* Negative testing

## UI Automation

* Browser automation
* Playwright
* Page Object Model
* Login automation
* Navigation
* Form interaction
* Assertions
* Screenshots
* Traces

## Framework

* PyTest
* Fixtures
* Configuration
* Test data
* Logging
* Utilities
* Reporting

## DevOps

* Docker
* GitHub Actions
* Parallel execution
* CI artifacts

---

# Technology Stack

| Technology     | Purpose                        |
| -------------- | ------------------------------ |
| Python         | Programming language           |
| PyTest         | Test framework                 |
| Playwright     | UI automation                  |
| Requests/HTTPX | API communication              |
| Allure         | Test reporting                 |
| Docker         | Reproducible execution         |
| GitHub Actions | CI/CD                          |
| Ruff           | Linting                        |
| Black          | Formatting                     |
| MyPy           | Type checking where configured |
| Git            | Version control                |

---

# Project Structure

```text
automated-api-ui-test-framework/
│
├── docs/
│   ├── PRD.md
│   ├── ARCHITECTURE.md
│   ├── DESIGN.md
│   ├── TEST_PLAN.md
│   ├── SECURITY.md
│   ├── DECISIONS.md
│   └── MEMORY.md
│
├── .github/
│   └── workflows/
│
├── .cursor/
│   └── rules/
│
├── src/
│   └── framework/
│       ├── api/
│       ├── ui/
│       ├── config/
│       ├── fixtures/
│       ├── data/
│       ├── utils/
│       └── reporting/
│
├── tests/
│   ├── api/
│   ├── ui/
│   ├── integration/
│   └── e2e/
│
├── docker/
│
├── reports/
├── logs/
├── screenshots/
│
├── .env.example
├── .gitignore
├── conftest.py
├── pytest.ini
├── pyproject.toml
├── requirements.txt
├── TASKS.md
└── README.md
```

---

# Getting Started

## 1. Clone Repository

```bash
git clone <repository-url>
cd automated-api-ui-test-framework
```

---

# 2. Create Virtual Environment

Windows PowerShell:

```powershell
python -m venv .venv
```

Activate:

```powershell
.venv\Scripts\Activate.ps1
```

Linux/macOS:

```bash
python3 -m venv .venv
source .venv/bin/activate
```

---

# 3. Install Dependencies

```bash
pip install -r requirements.txt
```

---

# 4. Install Playwright Browsers

```bash
playwright install
```

If required by the environment:

```bash
playwright install --with-deps
```

---

# 5. Configure Environment

Copy:

```text
.env.example
```

to your local environment configuration.

Do not commit real credentials.

---

# Running Tests

## Run All Tests

```bash
pytest
```

---

## Run API Tests

```bash
pytest tests/api
```

---

## Run UI Tests

```bash
pytest tests/ui
```

---

## Run Integration Tests

```bash
pytest tests/integration
```

---

## Run E2E Tests

```bash
pytest tests/e2e
```

---

# Test Markers

Example:

```bash
pytest -m smoke
```

```bash
pytest -m api
```

```bash
pytest -m ui
```

```bash
pytest -m regression
```

---

# Parallel Execution

When configured:

```bash
pytest -n auto
```

Parallel execution must only be enabled once tests are isolated and verified.

---

# Code Quality

Run linting:

```bash
ruff check .
```

Run formatting:

```bash
black .
```

Run formatting check:

```bash
black --check .
```

Run type checking if enabled:

```bash
mypy .
```

---

# Docker

Build the test image:

```bash
docker build -t automation-framework .
```

Run tests:

```bash
docker run --rm automation-framework
```

If Docker Compose is configured:

```bash
docker compose up --build
```

---

# CI/CD

GitHub Actions automatically validates the project.

The CI pipeline is intended to execute:

```text
Checkout
   ↓
Python Setup
   ↓
Install Dependencies
   ↓
Lint
   ↓
Type Check
   ↓
Unit Tests
   ↓
API Tests
   ↓
UI Tests
   ↓
Generate Reports
   ↓
Upload Artifacts
```

---

# Reporting

The framework is designed to generate Allure-compatible test results.

Conceptual workflow:

```bash
pytest --alluredir=reports/allure-results
```

Then generate/view the report according to the configured Allure environment.

---

# Debugging Failed UI Tests

When UI tests fail, check:

```text
screenshots/
logs/
Playwright traces
Allure results
```

The framework should attach relevant failure artifacts automatically where configured.

---

# Adding a New API Test

Recommended flow:

```text
Create/extend API service
        ↓
Create test data
        ↓
Create test
        ↓
Add assertions
        ↓
Run test
        ↓
Review
```

Do not duplicate HTTP infrastructure inside the test.

---

# Adding a New UI Test

Recommended flow:

```text
Create/extend Page Object
        ↓
Create test
        ↓
Perform user workflow
        ↓
Add assertions
        ↓
Run test
        ↓
Review
```

Use Page Objects for reusable UI interaction logic.

---

# Development Workflow

This project follows:

```text
READ
 ↓
UNDERSTAND
 ↓
PLAN
 ↓
IMPLEMENT
 ↓
TEST
 ↓
REVIEW
 ↓
FIX
 ↓
COMMIT
 ↓
DOCUMENT
```

Development should happen one `TASK-XXX` at a time.

---

# Git Workflow

Create a feature branch:

```bash
git checkout -b feature/api-client
```

Make changes.

Run tests.

Check status:

```bash
git status
```

Commit:

```bash
git add .
git commit -m "feat: add API client"
```

Push:

```bash
git push origin feature/api-client
```

---

# Security

Never commit:

* Passwords
* API keys
* Tokens
* Private keys
* Production credentials

Use environment variables and CI secrets.

See:

```text
docs/SECURITY.md
```

for complete security requirements.

---

# Documentation

Project documentation:

| File            | Purpose                |
| --------------- | ---------------------- |
| PRD.md          | What and why           |
| ARCHITECTURE.md | How the system works   |
| DESIGN.md       | Design and conventions |
| RULES.md        | Development/AI rules   |
| TASKS.md        | Development roadmap    |
| TEST_PLAN.md    | Testing strategy       |
| SECURITY.md     | Security requirements  |
| DECISIONS.md    | Technical decisions    |
| MEMORY.md       | Current project state  |

---

# Current Status

The project is currently in the planning/foundation phase.

Current task:

```text
TASK-001 — Initialize Repository
```

See:

```text
TASKS.md
```

for the complete roadmap.

---

# Project Goals

The final framework should allow a developer to:

1. Clone the project.
2. Configure an environment.
3. Run API tests.
4. Run UI tests.
5. Generate reports.
6. Run tests in Docker.
7. Run tests in GitHub Actions.
8. Diagnose failures.
9. Add new tests without changing framework infrastructure.

---

# Future Enhancements

Potential future versions may include:

* Advanced test analytics
* Flaky-test detection
* Test execution history
* AI failure analysis
* AI-assisted test generation
* AI test recommendations
* Web-based reporting dashboard

These features are not part of the MVP.

---

# License

Add the project's selected license before public release.
#   A u t o m a t e d - A P I - U I - T e s t - A u t o m a t i o n - F r a m e w o r k  
 