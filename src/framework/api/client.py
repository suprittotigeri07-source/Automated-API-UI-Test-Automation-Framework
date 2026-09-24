from typing import Any, TypeVar

import requests
from pydantic import BaseModel
from requests.adapters import HTTPAdapter
from urllib3.util import Retry

from framework.config.settings import get_settings
from framework.utils.helpers import measure_time, sanitize_data
from framework.utils.logger import get_logger

logger = get_logger("framework.api")
T = TypeVar("T", bound=BaseModel)


class APIResponse:
    """Wrapper around requests.Response providing structured access and validation."""

    def __init__(self, raw_response: requests.Response, duration_ms: float) -> None:
        self.raw_response = raw_response
        self.status_code = raw_response.status_code
        self.duration_ms = duration_ms
        self.headers = raw_response.headers
        self.text = raw_response.text

    def json(self) -> Any:
        """Parse response content as JSON."""
        return self.raw_response.json()

    def validate_schema(self, schema_cls: type[T]) -> T:
        """Validate JSON response body against a Pydantic model schema."""
        return schema_cls.model_validate(self.json())

    def assert_status_code(self, expected_status: int) -> None:
        """Assert HTTP response code with diagnostic details."""
        if self.status_code != expected_status:
            sanitized_body = sanitize_data(self.text)
            raise AssertionError(
                f"Expected HTTP status {expected_status}, but received {self.status_code}.\n"
                f"URL: {self.raw_response.request.method} {self.raw_response.url}\n"
                f"Response body: {sanitized_body}"
            )


class APIClient:
    """Production-grade HTTP client with centralized headers, auth, and logging."""

    def __init__(
        self,
        base_url: str | None = None,
        timeout: float | None = None,
        default_headers: dict[str, str] | None = None,
    ) -> None:
        settings = get_settings()
        self.base_url = (base_url or settings.base_api_url).rstrip("/")
        self.timeout = timeout if timeout is not None else settings.api_timeout
        self.session = requests.Session()

        # Mount robust retry adapter
        retry_strategy = Retry(
            total=4,
            connect=3,
            read=3,
            backoff_factor=0.5,
            status_forcelist=[429, 500, 502, 503, 504],
            allowed_methods=None,
            raise_on_status=False,
        )
        adapter = HTTPAdapter(max_retries=retry_strategy)
        self.session.mount("https://", adapter)
        self.session.mount("http://", adapter)

        headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "User-Agent": "AutomatedTestFramework/1.0",
        }
        if default_headers:
            headers.update(default_headers)
        self.session.headers.update(headers)

    def set_auth_token(self, token: str) -> None:
        """Set Bearer authorization header for subsequent requests."""
        self.session.headers["Authorization"] = f"Bearer {token}"

    def clear_auth_token(self) -> None:
        """Remove Authorization header."""
        self.session.headers.pop("Authorization", None)

    def _build_url(self, endpoint: str) -> str:
        """Construct full URL from base_url and relative endpoint."""
        clean_endpoint = endpoint.lstrip("/")
        return f"{self.base_url}/{clean_endpoint}"

    def request(
        self,
        method: str,
        endpoint: str,
        params: dict[str, Any] | None = None,
        data: Any = None,
        json_data: Any = None,
        headers: dict[str, str] | None = None,
    ) -> APIResponse:
        """Execute HTTP request with duration tracking and sanitized logging."""
        url = self._build_url(endpoint)
        sanitized_json = sanitize_data(json_data) if json_data else None
        logger.info(
            f"API Request: {method.upper()} {url} (params={params}, payload={sanitized_json})"
        )

        with measure_time() as timing:
            raw_response = self.session.request(
                method=method.upper(),
                url=url,
                params=params,
                data=data,
                json=json_data,
                headers=headers,
                timeout=self.timeout,
            )

        api_response = APIResponse(raw_response, timing["duration_ms"])
        logger.info(
            f"API Response: {raw_response.status_code} in {api_response.duration_ms}ms "
            f"for {method.upper()} {url}"
        )
        return api_response

    def get(self, endpoint: str, **kwargs: Any) -> APIResponse:
        """Perform HTTP GET."""
        return self.request("GET", endpoint, **kwargs)

    def post(self, endpoint: str, json: Any = None, **kwargs: Any) -> APIResponse:
        """Perform HTTP POST."""
        return self.request("POST", endpoint, json_data=json, **kwargs)

    def put(self, endpoint: str, json: Any = None, **kwargs: Any) -> APIResponse:
        """Perform HTTP PUT."""
        return self.request("PUT", endpoint, json_data=json, **kwargs)

    def patch(self, endpoint: str, json: Any = None, **kwargs: Any) -> APIResponse:
        """Perform HTTP PATCH."""
        return self.request("PATCH", endpoint, json_data=json, **kwargs)

    def delete(self, endpoint: str, **kwargs: Any) -> APIResponse:
        """Perform HTTP DELETE."""
        return self.request("DELETE", endpoint, **kwargs)
