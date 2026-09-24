"""API automation fixtures for PyTest."""

from collections.abc import Generator

import pytest

from framework.api.client import APIClient
from framework.api.services.user_service import UserService
from framework.config.settings import get_settings


@pytest.fixture
def api_client() -> Generator[APIClient, None, None]:
    """Provide a standard API client instance."""
    client = APIClient()
    yield client


@pytest.fixture
def authenticated_api_client() -> Generator[APIClient, None, None]:
    """Provide an authenticated API client with token configured."""
    settings = get_settings()
    client = APIClient()
    token = settings.auth_token or "demo_secure_jwt_token_xyz123"
    client.set_auth_token(token)
    yield client
    client.clear_auth_token()


@pytest.fixture
def user_service(api_client: APIClient) -> Generator[UserService, None, None]:
    """Provide a UserService instance attached to the API client."""
    service = UserService(client=api_client)
    yield service
