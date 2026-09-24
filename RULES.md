# Development Rules

## 1. General

* Follow the existing architecture.
* Read project documentation before making changes.
* Reuse existing functionality.
* Do not duplicate logic.
* Keep functions small.
* Keep classes focused.
* Do not modify unrelated files.
* Do not introduce dependencies without justification.
* Do not rewrite working code unnecessarily.

---

# 2. AI Coding Rules

Before implementing any task:

1. Read `PRD.md`.
2. Read `ARCHITECTURE.md`.
3. Read `DESIGN.md`.
4. Read `TASKS.md`.
5. Read `TEST_PLAN.md`.
6. Read `SECURITY.md`.
7. Inspect existing implementation.
8. Identify affected files.
9. Create an implementation plan.

Do not write code until the plan is understood.

---

# 3. Task Rules

Only implement the requested `TASK-XXX`.

Do not implement future tasks unless explicitly requested.

Do not expand project scope automatically.

---

# 4. Python Rules

* Follow PEP 8.
* Use type hints.
* Prefer clear code over clever code.
* Avoid unnecessary abstractions.
* Use descriptive names.
* Handle exceptions intentionally.
* Do not use bare `except`.
* Avoid global mutable state.
* Keep functions focused.

---

# 5. Test Rules

Every important feature should have appropriate tests.

Tests should:

* Be deterministic.
* Be isolated.
* Be readable.
* Have clear assertions.
* Avoid unnecessary dependencies.
* Clean up created test data where required.

---

# 6. API Rules

API tests should use the framework API client/service layer.

Do not duplicate:

* Base URLs
* Authentication logic
* Headers
* Request construction

Validate:

* Status codes
* Response structure
* Important business data
* Error responses

---

# 7. UI Rules

UI tests must use Page Objects for reusable interactions.

Do not scatter selectors across test files.

Prefer stable selectors.

Avoid unnecessary:

* Hard sleeps
* Arbitrary delays
* Brittle XPath expressions

Use Playwright's reliable waiting mechanisms.

---

# 8. Configuration Rules

Never hard-code:

* API URLs
* Credentials
* Tokens
* Environment-specific values

Configuration must come from the configuration layer/environment.

---

# 9. Security Rules

Never commit:

* API keys
* Passwords
* Access tokens
* Private certificates
* Production credentials

Sensitive information must be masked in logs and reports.

---

# 10. Logging Rules

Logs should help debugging.

Do not log sensitive information.

Use appropriate log levels.

Avoid excessive logging that makes reports unreadable.

---

# 11. Dependency Rules

Before adding a dependency:

1. Confirm it is necessary.
2. Check whether an existing dependency can solve the problem.
3. Consider maintenance and security.
4. Update dependency documentation.
5. Lock/version dependencies appropriately.

---

# 12. Docker Rules

Docker images should:

* Be reproducible.
* Avoid unnecessary packages.
* Use appropriate base images.
* Not contain secrets.
* Run the test suite consistently.

---

# 13. CI Rules

CI must fail when required quality checks fail.

At minimum, CI should validate:

* Formatting/linting
* Tests
* Build/execution integrity

---

# 14. Git Rules

Use small commits.

Recommended format:

```text
feat: add API client
test: add authentication tests
fix: handle API timeout
ci: add GitHub Actions workflow
docs: update architecture
refactor: simplify API service
```

---

# 15. Review Rules

Before marking a task complete:

* Review changed files.
* Run relevant tests.
* Check security implications.
* Check architecture.
* Check duplication.
* Check error handling.
* Update documentation.

---

# 16. Documentation Rules

Whenever architecture changes, update:

```text
ARCHITECTURE.md
DECISIONS.md
MEMORY.md
```

Whenever task progress changes:

```text
TASKS.md
MEMORY.md
```

---

# 17. AI Response Requirements

After implementing a task, report:

1. Files changed
2. What changed
3. Tests executed
4. Test results
5. Known issues
6. Next recommended task

Never claim a test passed unless it was actually executed.

---

# 18. Most Important Rule

Never build the entire project in one prompt.

Work one task at a time:

```text
Read
 ↓
Understand
 ↓
Plan
 ↓
Implement
 ↓
Test
 ↓
Review
 ↓
Fix
 ↓
Commit
 ↓
Document
```
