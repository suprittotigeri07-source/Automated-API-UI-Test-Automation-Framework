"""Unified Framework CLI Runner for quality checks, test execution, and analytics."""

import os
import subprocess
import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent

# Ensure local browser binaries and python path are configured
os.environ["PLAYWRIGHT_BROWSERS_PATH"] = str(PROJECT_ROOT / ".browsers")
sys.path.insert(0, str(PROJECT_ROOT / "src"))
sys.path.insert(0, str(PROJECT_ROOT))


def run_command(cmd: list[str], description: str) -> bool:
    """Execute shell command and stream output."""
    print("\n==========================================")
    print(f"  Executing: {description}")
    print(f"  Command:   {' '.join(cmd)}")
    print("==========================================\n")
    result = subprocess.run(cmd, cwd=str(PROJECT_ROOT))
    if result.returncode != 0:
        print(f"\n[ERROR] {description} failed with exit code {result.returncode}")
        return False
    return True


def main() -> None:
    """Run full automation pipeline."""
    python_exe = sys.executable

    # 1. Quality checks
    print("\n[STEP 1/3] Running Code Quality Checks (Ruff, Black, MyPy)...")
    if not run_command(
        [python_exe, "-m", "ruff", "check", "src", "tests", "conftest.py"], "Ruff Linting"
    ):
        sys.exit(1)

    if not run_command(
        [python_exe, "-m", "black", "--check", "src", "tests", "conftest.py"],
        "Black Formatting Check",
    ):
        sys.exit(1)

    if not run_command(
        [python_exe, "-m", "mypy", "src", "tests", "conftest.py"], "MyPy Type Check"
    ):
        sys.exit(1)

    # 2. Automated Test Suite Execution
    print("\n[STEP 2/3] Executing Automated PyTest Suite...")
    reports_dir = PROJECT_ROOT / "reports"
    reports_dir.mkdir(parents=True, exist_ok=True)
    report_html = reports_dir / "report.html"

    pytest_cmd = [
        python_exe,
        "-m",
        "pytest",
        "tests",
        f"--html={report_html}",
        "--self-contained-html",
        "--alluredir=reports/allure-results",
        "-ra",
        "-v",
    ]

    success = run_command(pytest_cmd, "PyTest Suite with HTML Report")

    # 3. Summary
    html_link = f"file:///{str(report_html).replace(chr(92), '/')}"
    allure_link = f"file:///{str(reports_dir / 'allure-results').replace(chr(92), '/')}"
    screens_link = f"file:///{str(PROJECT_ROOT / 'screenshots').replace(chr(92), '/')}"
    logs_link = f"file:///{str(PROJECT_ROOT / 'logs').replace(chr(92), '/')}"

    print("\n[STEP 3/3] Execution Summary & Ready Links:")
    print(f"  Interactive HTML Report: {html_link}")
    print(f"  Allure Raw Results:      {allure_link}")
    print(f"  Screenshots Directory:   {screens_link}")
    print(f"  Logs Directory:          {logs_link}\n")

    if not success:
        sys.exit(1)


if __name__ == "__main__":
    main()
