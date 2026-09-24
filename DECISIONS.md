# Architecture Decisions

This document records important technical decisions so that future development does not randomly change the architecture.

---

# ADR-001 — Use Python

## Decision

Use Python as the primary programming language.

## Reason

Python provides a mature ecosystem for:

* Test automation
* API testing
* Browser automation
* CI/CD
* Data processing

---

# ADR-002 — Use PyTest

## Decision

Use PyTest as the primary test runner.

## Reason

PyTest provides:

* Fixtures
* Parameterization
* Plugins
* Assertions
* Test discovery
* Flexible execution

---

# ADR-003 — Use Playwright

## Decision

Use Playwright for browser automation.

## Reason

The project requires reliable browser-based UI testing.

Playwright provides modern browser automation capabilities and useful debugging artifacts.

---

# ADR-004 — Use API Client Abstraction

## Decision

API tests should use a reusable API client/service layer.

## Reason

This prevents HTTP implementation details from being duplicated across tests.

---

# ADR-005 — Use Page Object Model

## Decision

UI automation will use Page Objects.

## Reason

Page Objects separate UI implementation from test scenarios and improve maintainability.

---

# ADR-006 — Separate Tests From Framework

## Decision

Test scenarios live under:

```text
tests/
```

Framework infrastructure lives under:

```text
src/framework/
```

## Reason

This establishes a clear dependency boundary.

---

# ADR-007 — Use Environment-Based Configuration

## Decision

Environment-specific configuration will be provided through environment variables/configuration.

## Reason

The same tests should run against different environments without source-code modifications.

---

# ADR-008 — Use Docker

## Decision

Support Docker-based test execution.

## Reason

Docker improves environment consistency between local development and CI.

---

# ADR-009 — Use GitHub Actions

## Decision

Use GitHub Actions for CI/CD.

## Reason

The project is hosted on GitHub and requires automated validation on code changes.

---

# ADR-010 — Use Allure Reporting

## Decision

Use Allure-compatible reporting.

## Reason

Automation engineers need readable test results and failure artifacts.

---

# ADR-011 — Do Not Add AI Features to MVP

## Decision

AI-assisted test generation and failure analysis are future features.

## Reason

The first version should establish a reliable automation foundation before adding AI capabilities.

---

# ADR-012 — Incremental Development

## Decision

Implement one TASK-XXX at a time.

## Reason

Small changes are easier to test, review, debug and revert.

---

# ADR-013 — Documentation as Project Context

## Decision

Maintain PRD, architecture, rules, tasks, test plan, security and project memory.

## Reason

AI-assisted development requires accurate project context to prevent inconsistent implementation.

---

# ADR-014 — No Unrelated Refactoring

## Decision

Tasks should not include unrelated refactoring unless explicitly requested.

## Reason

This reduces regression risk and makes code changes easier to review.

---

# ADR-015 — Test Before Completion

## Decision

A task cannot be considered complete until relevant tests have been executed.

## Reason

Compilation alone does not prove correctness.

---

# ADR-016 — HTTP Client Resilience with Backoff

## Decision

`APIClient` implements an `HTTPAdapter` configured with `urllib3.util.Retry` across all HTTP methods with exponential backoff.

## Reason

Public and cloud APIs experience transient connection resets and socket read timeouts. Automatic retries ensure test stability without flakiness.

---

# ADR-017 — Configurable Playwright Browser Location

## Decision

Support `PLAYWRIGHT_BROWSERS_PATH` through configuration, allowing browser binaries to reside on storage volumes with adequate disk space.

## Reason

Default user profile directories on the primary OS drive can experience disk exhaustion (ENOSPC). Dedicated project or secondary drive paths ensure reproducible browser installation and test execution.

