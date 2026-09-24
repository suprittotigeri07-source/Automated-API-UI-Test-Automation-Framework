"""TestPilot Backend - FastAPI Automation & Test Telemetry Server."""

import datetime
import uuid
from typing import Any, Dict, List, Optional
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import uvicorn

app = FastAPI(
    title="TestPilot Automation Backend API",
    description="Backend service powering automated Website, API, UI (Playwright), and Performance tests.",
    version="1.0.0",
)

# Enable CORS for React Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage for test runs & projects
MOCK_PROJECTS = [
    {
        "id": "proj_1",
        "name": "E-Commerce Platform",
        "url": "https://shop.example.com",
        "healthScore": 92,
        "lastTested": "2 minutes ago",
        "testCount": 35,
        "successRate": 94,
    },
    {
        "id": "proj_2",
        "name": "Core Authentication API",
        "url": "https://api.example.com/v1",
        "healthScore": 84,
        "lastTested": "1 hour ago",
        "testCount": 18,
        "successRate": 88,
    },
    {
        "id": "proj_3",
        "name": "Marketing Landing Page",
        "url": "https://example.com",
        "healthScore": 96,
        "lastTested": "Yesterday",
        "testCount": 28,
        "successRate": 98,
    },
]

MOCK_RUNS = [
    {
        "id": "run_1042",
        "targetUrl": "https://example.com",
        "status": "Healthy",
        "score": 92,
        "totalTests": 28,
        "passed": 27,
        "warnings": 1,
        "failed": 0,
        "duration": 12.4,
        "createdAt": (datetime.datetime.now(datetime.timezone.utc) - datetime.timedelta(minutes=2)).isoformat(),
        "apiStatus": "Healthy",
        "uiStatus": "Healthy",
        "perfScore": 94,
    },
    {
        "id": "run_1041",
        "targetUrl": "https://shop.example.com",
        "status": "Warning",
        "score": 79,
        "totalTests": 35,
        "passed": 30,
        "warnings": 4,
        "failed": 1,
        "duration": 18.7,
        "createdAt": (datetime.datetime.now(datetime.timezone.utc) - datetime.timedelta(hours=1)).isoformat(),
        "apiStatus": "Warning",
        "uiStatus": "Healthy",
        "perfScore": 72,
    },
]


# Pydantic Request Models
class LoginRequest(BaseModel):
    email: str
    password: str


class RegisterRequest(BaseModel):
    name: str
    email: str
    password: str


class StartTestRequest(BaseModel):
    url: str
    environment: Optional[str] = "production"
    config: Optional[Dict[str, bool]] = Field(default_factory=dict)


class ProjectCreateRequest(BaseModel):
    name: str
    url: str


@app.get("/")
def root():
    return {
        "service": "TestPilot FastAPI Backend",
        "status": "online",
        "tagline": "Test smarter. Ship confidently.",
        "docs_url": "http://127.0.0.1:8000/docs",
    }


@app.get("/api/health")
def health_check():
    return {"status": "ok", "timestamp": datetime.datetime.now(datetime.timezone.utc).isoformat()}


@app.post("/api/auth/login")
def login(payload: LoginRequest):
    if not payload.email or not payload.password:
        raise HTTPException(status_code=400, detail="Email and password are required")
    return {
        "token": f"tp_jwt_{uuid.uuid4().hex}",
        "user": {
            "id": "user_demo",
            "name": payload.email.split("@")[0].capitalize(),
            "email": payload.email,
            "role": "QA Lead",
        },
    }


@app.post("/api/auth/register")
def register(payload: RegisterRequest):
    return {
        "token": f"tp_jwt_{uuid.uuid4().hex}",
        "user": {
            "id": f"user_{uuid.uuid4().hex[:8]}",
            "name": payload.name,
            "email": payload.email,
            "role": "QA Engineer",
        },
    }


@app.get("/api/dashboard/stats")
def get_dashboard_stats():
    return {
        "totalTests": 1248,
        "passed": 1163,
        "failed": 54,
        "warnings": 31,
        "successRate": 93.2,
        "averageDuration": 14.8,
        "totalRuns": len(MOCK_RUNS),
    }


@app.get("/api/projects")
def list_projects():
    return MOCK_PROJECTS


@app.post("/api/projects")
def create_project(payload: ProjectCreateRequest):
    new_proj = {
        "id": f"proj_{uuid.uuid4().hex[:6]}",
        "name": payload.name,
        "url": payload.url,
        "healthScore": 95,
        "lastTested": "Just now",
        "testCount": 12,
        "successRate": 100,
    }
    MOCK_PROJECTS.insert(0, new_proj)
    return new_proj


@app.get("/api/tests")
def get_recent_tests():
    return MOCK_RUNS


@app.post("/api/tests")
def start_test(payload: StartTestRequest):
    new_id = f"run_{uuid.uuid4().hex[:4]}"
    run_entry = {
        "id": new_id,
        "targetUrl": payload.url,
        "status": "Healthy",
        "score": 94,
        "totalTests": 28,
        "passed": 27,
        "warnings": 1,
        "failed": 0,
        "duration": 11.2,
        "createdAt": datetime.datetime.now(datetime.timezone.utc).isoformat(),
        "apiStatus": "Healthy",
        "uiStatus": "Healthy",
        "perfScore": 91,
    }
    MOCK_RUNS.insert(0, run_entry)
    return run_entry


@app.get("/api/tests/{run_id}")
@app.get("/api/tests/{run_id}/results")
def get_test_results(run_id: str):
    # Retrieve run metadata or fallback
    run_item = next((r for r in MOCK_RUNS if r["id"] == run_id), MOCK_RUNS[0])

    return {
        **run_item,
        "summary": {
            "websiteHealth": "Healthy",
            "apiHealth": run_item.get("apiStatus", "Healthy"),
            "uiHealth": run_item.get("uiStatus", "Healthy"),
            "performanceScore": run_item.get("perfScore", 92),
            "securityGrade": "A",
        },
        "apiTests": [
            {
                "id": "api_1",
                "method": "GET",
                "endpoint": "/api/v1/users",
                "status": 200,
                "duration": 182,
                "result": "PASS",
                "response": {"total": 42, "users": [{"id": 1, "name": "Alice Smith", "email": "alice@example.com"}]},
            },
            {
                "id": "api_2",
                "method": "POST",
                "endpoint": "/api/v1/auth/login",
                "status": 200,
                "duration": 421,
                "result": "PASS",
                "response": {"token": "jwt_secure_session_token_xyz", "expires_in": 3600},
            },
            {
                "id": "api_3",
                "method": "GET",
                "endpoint": "/api/v1/products",
                "status": 500,
                "duration": 623,
                "result": "FAIL",
                "expected": 200,
                "actual": 500,
                "response": {"error": "InternalServerError", "message": "Database connection pool timeout while acquiring client"},
            },
            {
                "id": "api_4",
                "method": "PUT",
                "endpoint": "/api/v1/users/1",
                "status": 200,
                "duration": 215,
                "result": "PASS",
                "response": {"id": 1, "updated": True},
            },
            {
                "id": "api_5",
                "method": "DELETE",
                "endpoint": "/api/v1/cache/flush",
                "status": 204,
                "duration": 98,
                "result": "PASS",
                "response": None,
            },
        ],
        "uiTests": [
            {"id": "ui_1", "title": "Homepage Loads & Hero Renders", "status": "PASS", "duration": 1.2, "browser": "Chromium"},
            {"id": "ui_2", "title": "Top Navigation Menu Responsive", "status": "PASS", "duration": 0.8, "browser": "Chromium"},
            {"id": "ui_3", "title": "Login Form Fields & Password Input", "status": "PASS", "duration": 1.4, "browser": "Chromium"},
            {"id": "ui_4", "title": "Interactive CTA Buttons Clickable", "status": "PASS", "duration": 0.9, "browser": "Chromium"},
            {
                "id": "ui_5",
                "title": "Modal Submission Interaction Validation",
                "status": "FAIL",
                "duration": 4.8,
                "browser": "Chromium",
                "error": 'Element locator "button#submit-modal" did not become visible within 4000ms threshold.',
                "screenshotUrl": "/screenshots/test_home_view.png",
            },
        ],
        "performance": {
            "score": run_item.get("perfScore", 92),
            "metrics": [
                {"name": "Page Load", "value": "1.82s", "status": "good", "benchmark": "< 2.5s"},
                {"name": "First Contentful Paint (FCP)", "value": "0.92s", "status": "good", "benchmark": "< 1.8s"},
                {"name": "Largest Contentful Paint (LCP)", "value": "2.1s", "status": "moderate", "benchmark": "< 2.5s"},
                {"name": "DOM Content Loaded", "value": "1.4s", "status": "good", "benchmark": "< 2.0s"},
                {"name": "Average API Latency", "value": "342ms", "status": "good", "benchmark": "< 500ms"},
            ],
            "chartData": [
                {"time": "0s", "cpu": 12, "memory": 45, "network": 0},
                {"time": "0.5s", "cpu": 78, "memory": 52, "network": 1200},
                {"time": "1.0s", "cpu": 65, "memory": 58, "network": 3400},
                {"time": "1.5s", "cpu": 42, "memory": 61, "network": 1800},
                {"time": "2.0s", "cpu": 22, "memory": 62, "network": 400},
                {"time": "2.5s", "cpu": 15, "memory": 62, "network": 50},
            ],
        },
        "network": [
            {"method": "GET", "url": "https://example.com/", "status": 200, "type": "document", "duration": "184ms", "size": "24.2 KB"},
            {"method": "GET", "url": "https://example.com/assets/main.css", "status": 200, "type": "stylesheet", "duration": "42ms", "size": "18.4 KB"},
            {"method": "GET", "url": "https://example.com/assets/bundle.js", "status": 200, "type": "script", "duration": "128ms", "size": "142.1 KB"},
            {"method": "GET", "url": "https://example.com/api/v1/products", "status": 500, "type": "xhr", "duration": "623ms", "size": "1.2 KB"},
            {"method": "GET", "url": "https://example.com/favicon.ico", "status": 200, "type": "image", "duration": "16ms", "size": "4.2 KB"},
        ],
        "consoleLogs": [
            {"type": "ERROR", "message": "Failed to load resource: server responded with 500 at /api/v1/products", "timestamp": "13:30:14.218"},
            {"type": "WARNING", "message": "Warning: Deprecated API usage: requestAnimationFrame fallback", "timestamp": "13:30:14.012"},
            {"type": "INFO", "message": "Application initialized successfully in production mode", "timestamp": "13:30:13.882"},
        ],
        "aiAnalysis": {
            "problemDetected": "Endpoint /api/v1/products returned HTTP 500 Internal Server Error.",
            "explanation": "The target API endpoint responded with a server-side exception while surrounding endpoints (/api/v1/users and /auth) operated normally.",
            "possibleCauses": [
                "Database connection pool exhaustion on the products read replica.",
                "Missing environment configuration or deadlocks during concurrent queries.",
                "Uncaught unhandled promise rejection in the products routing microservice.",
            ],
            "recommendation": "Inspect backend query timeouts and ensure database connection pool limits match max worker concurrency.",
        },
    }


def main():
    print("=======================================================")
    print("  🚀 Starting TestPilot FastAPI Backend Server")
    print("  👉 API Root:        http://127.0.0.1:8000")
    print("  👉 Interactive Docs: http://127.0.0.1:8000/docs")
    print("=======================================================")
    uvicorn.run("backend.main:app", host="127.0.0.1", port=8000, reload=True)


if __name__ == "__main__":
    main()
