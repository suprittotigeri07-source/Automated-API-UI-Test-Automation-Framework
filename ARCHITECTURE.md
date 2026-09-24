# Architecture

## 1. Overview

The Automated API & UI Test Automation Framework is a Python-based automation framework designed to provide reusable infrastructure for API and browser-based UI testing.

The architecture separates:

* Test scenarios
* Framework infrastructure
* API communication
* UI automation
* Configuration
* Test data
* Reporting
* Utilities

---

# 2. High-Level Architecture

```text
                    Developer
                       |
                       v
                   PyTest
                       |
          +------------+------------+
          |                         |
          v                         v
     API Automation           UI Automation
          |                         |
          v                         v
    API Client                Playwright
          |                         |
          v                         v
    Application API          Web Application
          |                         |
          +------------+------------+
                       |
                       v
                Assertions
                       |
                       v
                  Reporting
                       |
                       v
                GitHub Actions
                       |
                       v
                    Docker
```

---

# 3. Architectural Layers

## Layer 1 — Test Layer

Location:

```text
tests/
```

Responsibilities:

* Define test scenarios
* Arrange test data
* Execute framework services
* Perform assertions
* Define test cases

Tests must not contain infrastructure implementation.

---

# 4. API Layer

Location:

```text
src/framework/api/
```

Responsibilities:

* HTTP communication
* Request construction
* Authentication
* Response handling
* API validation

Example structure:

```text
api/
├── client.py
├── requests.py
├── endpoints.py
└── validators.py
```

---

# 5. UI Layer

Location:

```text
src/framework/ui/
```

Responsibilities:

* Browser initialization
* Page objects
* Common UI operations
* Browser interactions
* Screenshots
* Tracing

Structure:

```text
ui/
├── browser.py
├── base_page.py
└── pages/
    ├── login_page.py
    ├── dashboard_page.py
    └── users_page.py
```

---

# 6. Configuration Layer

Location:

```text
src/framework/config/
```

Responsibilities:

* Environment configuration
* URLs
* Credentials
* Browser settings
* Timeouts
* Runtime configuration

Configuration must not be hard-coded inside tests.

---

# 7. Fixture Layer

Location:

```text
src/framework/fixtures/
```

Responsibilities:

* API clients
* Browser instances
* Page objects
* Authentication
* Test setup
* Test cleanup

PyTest fixtures should be used whenever reusable setup or teardown is required.

---

# 8. Data Layer

Location:

```text
src/framework/data/
```

Responsibilities:

* Test data
* JSON files
* YAML files
* Data factories
* Reusable test objects

---

# 9. Utility Layer

Location:

```text
src/framework/utils/
```

Responsibilities:

* Logging
* Screenshot helpers
* Common utility functions
* File utilities
* Runtime helpers

Utilities should remain generic and reusable.

---

# 10. Reporting Layer

Location:

```text
src/framework/reporting/
```

Responsibilities:

* Allure configuration
* Attachments
* Test metadata
* Failure artifacts

---

# 11. Test Execution Flow

## API Test

```text
Test
 ↓
Fixture
 ↓
Service/API Client
 ↓
HTTP Request
 ↓
API
 ↓
Response
 ↓
Validation
 ↓
Assertion
 ↓
Report
```

## UI Test

```text
Test
 ↓
Fixture
 ↓
Page Object
 ↓
Playwright
 ↓
Browser
 ↓
Web Application
 ↓
Assertion
 ↓
Screenshot/Trace
 ↓
Report
```

---

# 12. API Architecture

The framework should provide a reusable API client.

Conceptual structure:

```text
Test
 ↓
Service
 ↓
APIClient
 ↓
HTTP Client
 ↓
Endpoint
```

Tests should not directly manage low-level HTTP infrastructure unless there is a documented reason.

---

# 13. UI Architecture

The framework should use Page Object Model.

```text
Test
 ↓
Page Object
 ↓
Base Page
 ↓
Playwright
 ↓
Browser
```

Page objects contain UI interaction logic.

Tests contain business scenarios.

---

# 14. Configuration Flow

```text
Environment Variables
        |
        v
Configuration Layer
        |
        v
Fixtures / Framework
        |
        v
Tests
```

---

# 15. CI/CD Architecture

```text
Developer
    |
    v
Git Push
    |
    v
GitHub
    |
    v
GitHub Actions
    |
    +--> Lint
    |
    +--> Type Check
    |
    +--> Unit Tests
    |
    +--> API Tests
    |
    +--> UI Tests
    |
    +--> Reports
    |
    +--> Artifacts
```

---

# 16. Docker Architecture

```text
Docker Container
|
+-- Python
+-- Dependencies
+-- PyTest
+-- Playwright
+-- Browsers
+-- Framework
+-- Tests
```

The same containerized environment should be usable locally and within CI where practical.

---

# 17. Dependency Direction

The preferred dependency direction is:

```text
Tests
  ↓
Framework
  ↓
External Systems
```

Framework components should not depend on individual test modules.

---

# 18. Architectural Rules

1. Tests must not contain duplicated framework infrastructure.
2. UI tests must use Page Objects for reusable page interaction.
3. API tests must use reusable API clients/services.
4. Configuration must be centralized.
5. Secrets must never be hard-coded.
6. Test data should be separated from implementation.
7. Framework utilities must remain generic.
8. Business/test scenarios must remain in `tests/`.
9. Unrelated layers must not be coupled.
10. New architectural patterns require documentation.

---

# 19. Scalability

The framework must allow:

```text
New API
   ↓
New Service
   ↓
New Tests
```

without modifying existing API infrastructure.

Similarly:

```text
New Page
   ↓
New Page Object
   ↓
New Tests
```

without modifying unrelated pages.

---

# 20. Maintainability

The framework should favor:

* Small modules
* Clear responsibilities
* Reusable fixtures
* Explicit configuration
* Strong naming
* Low duplication
* Isolated tests

Architecture decisions must be recorded in `DECISIONS.md`.
