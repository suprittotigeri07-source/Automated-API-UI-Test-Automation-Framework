# 🚀 Automated API & UI Test Automation Framework

[![Python](https://img.shields.io/badge/Python-3.10%2B-blue.svg?logo=python&logoColor=white)](https://www.python.org/)
[![Pytest](https://img.shields.io/badge/Pytest-8.0%2B-0A9EDC.svg?logo=pytest&logoColor=white)](https://pytest.org/)
[![Playwright](https://img.shields.io/badge/Playwright-UI%20Testing-2EAD33.svg?logo=playwright&logoColor=white)](https://playwright.dev/python/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Backend%20API-009688.svg?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-19-61DAFB.svg?logo=react&logoColor=black)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS%204-06B6D4.svg?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED.svg?logo=docker&logoColor=white)](https://www.docker.com/)
[![CI/CD](https://img.shields.io/badge/GitHub%20Actions-CI%2FCD-2088FF.svg?logo=githubactions&logoColor=white)](https://github.com/)

A modern, production-grade test automation and QA observability platform combining a robust **Python test framework (Pytest + Playwright + HTTPX)** with a **FastAPI backend orchestration engine** and an interactive **React + Vite analytics dashboard**.

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Architecture & Tech Stack](#-architecture--tech-stack)
- [Project Structure](#-project-structure)
- [Core Features](#-core-features)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [1. Clone Repository](#1-clone-repository)
  - [2. Backend & Test Framework Setup](#2-backend--test-framework-setup)
  - [3. Install Playwright Browsers](#3-install-playwright-browsers)
  - [4. Frontend Dashboard Setup](#4-frontend-dashboard-setup)
  - [5. Environment Configuration](#5-environment-configuration)
- [Running the Application](#-running-the-application)
  - [Starting the Full Stack (Dashboard + Backend)](#starting-the-full-stack-dashboard--backend)
  - [Running Tests via CLI](#running-tests-via-cli)
  - [Using Test Markers](#using-test-markers)
  - [Parallel Test Execution](#parallel-test-execution)
- [Docker & Containerized Execution](#-docker--containerized-execution)
- [CI/CD Pipeline](#-cicd-pipeline)
- [Writing & Extending Tests](#-writing--extending-tests)
- [Git Upload Instructions](#-git-upload-instructions)
- [License](#-license)

---

## 🌟 Overview

This framework is built to provide an end-to-end testing and QA reporting ecosystem. It solves common test automation bottlenecks:

- **Isolated Test Execution**: Strict isolation between test cases with robust setup/teardown fixtures.
- **Unified API & UI Flows**: Run standalone API tests, UI tests using Page Object Model (POM), or combined end-to-end integration workflows.
- **FastAPI Control Plane**: Trigger test runs dynamically via REST endpoints, query execution history, and stream real-time logs.
- **Interactive Web Dashboard**: Monitor pass/fail rates, execution trends, error stack traces, and failure screenshots in a sleek UI.
- **DevOps Ready**: Automated linting, formatting, containerization, and GitHub Actions CI pipelines.

---

## 🏗️ Architecture & Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Core Language** | Python 3.10+ | Primary language for test suites and backend service |
| **Test Runner** | PyTest | Test discovery, fixtures, parameterization, and markers |
| **UI Automation** | Playwright (Python) | High-speed, resilient browser automation with auto-waiting |
| **API Client** | HTTPX / Requests | Synchronous and asynchronous REST API test execution |
| **Design Pattern** | Page Object Model (POM) | Clean separation of UI page selectors and test logic |
| **Backend Service** | FastAPI + Uvicorn | REST API to run tests, aggregate metrics, and manage runs |
| **Frontend UI** | React 19 + Vite | High-performance dashboard with live charts & reporting |
| **Styling & Icons** | TailwindCSS 4 + Lucide | Sleek, responsive, and accessible UI components |
| **Visualization** | Recharts | Test outcome charts, duration distributions, and historical trends |
| **Reporting** | Allure & Custom HTML | Rich test reports with screenshots, logs, and traces |
| **Containerization** | Docker & Docker Compose | Consistent, reproducible execution across local and CI environments |
| **CI/CD** | GitHub Actions | Automated build, lint, format check, and test verification |

---

## 📁 Project Structure

```text
Automated-API-UI-Test-Automation-Framework/
├── backend/                  # FastAPI orchestration server
│   ├── main.py               # REST API endpoints (runs, reports, metrics)
│   └── __init__.py
├── frontend/                 # React + Vite test analytics dashboard
│   ├── src/
│   │   ├── components/       # Reusable UI components & layouts (Sidebar, etc.)
│   │   ├── pages/            # Dashboard pages (Reports, Results, Overview)
│   │   ├── services/         # API clients (authService, testService)
│   │   └── index.css         # TailwindCSS styles
│   ├── package.json
│   └── vite.config.js
├── src/                      # Framework core modules
│   └── framework/
│       ├── api/              # HTTP clients, endpoint abstractions & auth
│       ├── ui/               # Playwright browser manager & Page Objects
│       ├── config/           # Pydantic environment configurations
│       ├── fixtures/         # Pytest fixtures for API and UI
│       ├── data/             # Test data builders & factories
│       ├── reporting/        # Allure & HTML report generators
│       └── utils/            # Logging, wait helpers, retry decorators
├── tests/                    # Automated test suites
│   ├── api/                  # REST API tests (CRUD, Auth, Status codes)
│   ├── ui/                   # Web UI tests using Page Objects
│   ├── integration/          # Combined API + UI end-to-end workflows
│   └── e2e/                  # Full lifecycle user journey tests
├── docker/                   # Docker environment configurations
├── reports/                  # Generated test reports (Allure, HTML)
├── logs/                     # Test execution log files
├── screenshots/              # Failure screenshots & visual artifacts
├── .github/
│   └── workflows/ci.yml      # GitHub Actions CI/CD pipeline
├── Dockerfile                # Test runner container definition
├── docker-compose.yml        # Multi-service composition
├── conftest.py               # Root pytest hooks, CLI options & fixtures
├── pytest.ini                # PyTest configuration & marker definitions
├── requirements.txt          # Python dependencies
├── serve_dashboard.py        # Dashboard launcher script
└── README.md
```

---

## ✨ Core Features

### 🔌 API Automation
- Full HTTP method support: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`.
- Automated session, bearer token, and header management.
- Schema validation, status code verification, and response payload assertions.
- Negative scenario verification (unauthorized, bad request, timeouts, rate limits).

### 🖥️ UI Automation (Playwright)
- Resilient browser execution across Chromium, Firefox, and WebKit.
- Strict Page Object Model (POM) architecture.
- Auto-waiting mechanisms eliminating flaky hard sleeps.
- Automatic capture of failure screenshots, video recordings, and Playwright execution traces.

### 📊 Real-Time Analytics Dashboard
- Live dashboard displaying passed, failed, skipped, and error metrics.
- Execution history with granular logs and error stack traces.
- Direct test execution controls from the browser interface.

### ⚡ DevOps & CI/CD
- Headless execution in Docker containers.
- GitHub Actions workflow for automated testing on pull requests and pushes.
- Parallel test execution support via `pytest-xdist`.

---

## 🚀 Getting Started

### Prerequisites

- **Python**: `3.10+` installed ([Download Python](https://www.python.org/downloads/))
- **Node.js**: `18.0+` & **npm** installed ([Download Node](https://nodejs.org/))
- **Git**: Installed and configured on your system

---

### 1. Clone Repository

```bash
git clone https://github.com/suprittotigeri07-source/Automated-API-UI-Test-Automation-Framework.git
cd "Automated API & UI Test Automation Framework"
```

---

### 2. Backend & Test Framework Setup

Create and activate a Python virtual environment:

**Windows (PowerShell):**
```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
```

**Linux / macOS:**
```bash
python3 -m venv .venv
source .venv/bin/activate
```

Install Python dependencies:
```bash
pip install -r requirements.txt
```

---

### 3. Install Playwright Browsers

Download the required browser binaries for UI automation:
```bash
playwright install
```
*(On Linux/CI, use `playwright install --with-deps` to install system libraries).*

---

### 4. Frontend Dashboard Setup

Install dependencies for the React + Vite frontend:
```bash
cd frontend
npm install
cd ..
```

---

### 5. Environment Configuration

Copy the example environment template:

**Windows (PowerShell):**
```powershell
Copy-Item .env.example .env
```

**Linux / macOS:**
```bash
cp .env.example .env
```

Edit `.env` to customize target URLs, browser settings, or credentials:
```env
BASE_API_URL=https://jsonplaceholder.typicode.com
BASE_UI_URL=https://the-internet.herokuapp.com
BROWSER=chromium
HEADLESS=true
LOG_LEVEL=INFO
REPORT_DIR=reports
SCREENSHOT_ON_FAILURE=true
```

---

## 🏃 Running the Application

### Starting the Full Stack (Dashboard + Backend)

#### Terminal 1: Start the FastAPI Backend
From the project root directory:
```bash
python -m uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload
```
The backend API and Swagger docs will be live at: `http://127.0.0.1:8000/docs`

#### Terminal 2: Start the React Frontend Dashboard
From the `frontend` directory:
```bash
cd frontend
npm run dev
```
Open your browser and navigate to: `http://localhost:5173`

---

### Running Tests via CLI

Run all tests in the repository:
```bash
pytest
```

Run specific test suites:
```bash
# Run API tests only
pytest tests/api

# Run UI tests only
pytest tests/ui

# Run Integration tests
pytest tests/integration

# Run a single test file
pytest tests/api/test_users.py -v
```

Run with visible browser (headed mode):
```bash
pytest tests/ui --headed
```

---

### Using Test Markers

Filter test runs using predefined pytest markers:
```bash
# Run smoke tests
pytest -m smoke

# Run API tests
pytest -m api

# Run UI tests
pytest -m ui

# Run regression suite
pytest -m regression
```

---

### Parallel Test Execution

Speed up execution across multiple CPU cores:
```bash
pytest -n auto
```

---

## 🐳 Docker & Containerized Execution

Run the complete test suite inside a standalone Docker container:

```bash
# Build the Docker image
docker build -t test-automation-framework .

# Run test execution
docker run --rm test-automation-framework
```

Or run via Docker Compose:
```bash
docker compose up --build
```

---

## 🔄 CI/CD Pipeline

The framework includes a ready-to-use GitHub Actions workflow configured in `.github/workflows/ci.yml`.

Every push or pull request triggers:
1. Python environment setup.
2. Code linting and formatting verification (`ruff`, `black`).
3. Playwright browser installation with system dependencies.
4. Test execution across API and UI suites.
5. Archiving test reports and failure artifacts.

---

## ✍️ Writing & Extending Tests

### Adding a New API Test
1. Define endpoint calls inside `src/framework/api/`.
2. Create test functions in `tests/api/`:
```python
import pytest

@pytest.mark.api
def test_create_user(api_client):
    payload = {"name": "Alex", "role": "QA Engineer"}
    response = api_client.post("/users", json=payload)
    assert response.status_code == 201
    assert response.json()["name"] == "Alex"
```

### Adding a New UI Test (Page Object Model)
1. Add page selectors and actions to `src/framework/ui/pages/`.
2. Write test cases in `tests/ui/`:
```python
import pytest
from src.framework.ui.pages.login_page import LoginPage

@pytest.mark.ui
def test_valid_login(page):
    login_page = LoginPage(page)
    login_page.navigate()
    login_page.login("tomsmith", "SuperSecretPassword!")
    assert login_page.is_logged_in()
```

---

## 📤 Git Upload Instructions

To upload or push this framework to your GitHub repository:

### Step 1: Check Current Git Status
```bash
git status
```

### Step 2: Stage All Project Files
```bash
git add .
```

### Step 3: Commit the Changes
```bash
git commit -m "feat: complete test automation framework with backend and frontend dashboard"
```

### Step 4: Ensure the Default Branch is `main`
```bash
git branch -M main
```

### Step 5: Verify Your Remote Repository URL
```bash
git remote -v
```
*(If remote is not set, add it via: `git remote add origin https://github.com/suprittotigeri07-source/Automated-API-UI-Test-Automation-Framework.git`)*

### Step 6: Push Code to GitHub
```bash
git push -u origin main
```

> **Note:** If GitHub rejects the push due to remote changes (e.g. existing remote commits), pull and rebase first:
> ```bash
> git pull origin main --rebase
> git push -u origin main
> ```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).