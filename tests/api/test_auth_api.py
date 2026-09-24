"""API authentication header and token validation tests."""

import pytest

from framework.api.client import APIClient


@pytest.mark.api
@pytest.mark.smoke
def test_authenticated_client_headers(authenticated_api_client: APIClient) -> None:
    """Verify authenticated API client sets Authorization header properly."""
    auth_header = authenticated_api_client.session.headers.get("Authorization")
    assert auth_header is not None
    assert str(auth_header).startswith("Bearer ")


@pytest.mark.api
@pytest.mark.regression
def test_clear_auth_token(authenticated_api_client: APIClient) -> None:
    """Verify clearing auth token removes Authorization header."""
    authenticated_api_client.clear_auth_token()
    assert "Authorization" not in authenticated_api_client.session.headers
