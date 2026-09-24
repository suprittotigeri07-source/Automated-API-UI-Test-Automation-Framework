# Design System

## 1. Purpose

This document defines how the automation framework should be structured, named and presented through reports, logs and developer-facing interfaces.

Unlike a traditional web application, this project does not require a complex visual UI.

The primary design goal is:

> Clear, professional and highly readable developer experience.

---

# 2. Design Principles

The framework should be:

* Minimal
* Consistent
* Predictable
* Readable
* Professional
* Developer-friendly
* Debuggable

---

# 3. Python Style

Follow standard Python conventions.

Use:

* `snake_case` for variables and functions
* `PascalCase` for classes
* `UPPER_CASE` for constants
* Type hints for public interfaces

Example:

```python
def get_user(user_id: int) -> Response:
    ...
```

---

# 4. File Naming

Use descriptive names.

Good:

```text
login_page.py
user_service.py
api_client.py
test_login.py
```

Avoid:

```text
helper2.py
test123.py
common_new.py
temp.py
```

---

# 5. Test Naming

Test names should describe behavior.

Good:

```python
def test_user_can_login_with_valid_credentials():
    ...
```

Avoid:

```python
def test_login1():
    ...
```

---

# 6. Test Organization

Tests should be organized by domain.

Example:

```text
tests/
├── api/
│   ├── test_auth.py
│   └── test_users.py
│
├── ui/
│   ├── test_login.py
│   └── test_users.py
│
└── integration/
```

---

# 7. Logging Design

Logs should answer:

1. What happened?
2. When did it happen?
3. Which test caused it?
4. What operation was performed?
5. What failed?

Example:

```text
INFO  | Starting login test
INFO  | Navigating to login page
INFO  | Submitting login form
INFO  | Login successful
```

---

# 8. Log Levels

Use:

```text
DEBUG
INFO
WARNING
ERROR
CRITICAL
```

Sensitive values must be masked.

Example:

```text
password=********
token=********
```

---

# 9. API Logging

Where appropriate, API logs should include:

```text
METHOD
URL
STATUS
DURATION
REQUEST ID
```

Request bodies containing secrets must be sanitized.

---

# 10. UI Failure Design

When a UI test fails, the framework should attempt to provide:

* Screenshot
* Browser trace where configured
* Error message
* Test name
* Page URL
* Relevant logs

---

# 11. Test Reports

Reports should make it easy to answer:

* How many tests ran?
* How many passed?
* How many failed?
* Which tests failed?
* Why did they fail?
* What artifacts are available?

---

# 12. Test Metadata

Where useful, tests should include:

* Feature
* Component
* Priority
* Test type
* Environment

Example conceptual metadata:

```text
Feature: Authentication
Type: UI
Priority: Critical
Environment: Staging
```

---

# 13. Error Messages

Errors should be actionable.

Bad:

```text
AssertionError
```

Better:

```text
Expected HTTP status 201 but received 400
```

Best:

```text
Create-user API returned HTTP 400.
Expected: 201
Endpoint: POST /users
Response: <sanitized response>
```

---

# 14. Documentation Style

Documentation should be:

* Concise
* Structured
* Easy to scan
* Example-driven
* Updated with implementation changes

---

# 15. Developer Experience

A new developer should be able to understand:

```text
What is this project?
        ↓
How do I install it?
        ↓
How do I configure it?
        ↓
How do I run tests?
        ↓
How do I add a test?
        ↓
How do I debug failures?
```

from `README.md`.

---

# 16. Consistency Rules

The same concepts must use the same naming throughout:

* API client
* Services
* Page Objects
* Fixtures
* Test data
* Configuration
* Reports

Avoid multiple names for the same concept.
