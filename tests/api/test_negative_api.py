"""Negative and edge-case API tests."""

import pytest

from framework.api.client import APIClient
from framework.api.services.user_service import UserService


@pytest.mark.api
@pytest.mark.regression
def test_get_non_existent_user_returns_404(user_service: UserService) -> None:
    """Verify requesting non-existent resource ID returns 404 Not Found."""
    non_existent_id = 999999
    response = user_service.get_user_by_id(non_existent_id)
    response.assert_status_code(404)


@pytest.mark.api
@pytest.mark.regression
def test_invalid_endpoint_returns_404(api_client: APIClient) -> None:
    """Verify requesting an invalid endpoint returns HTTP 404."""
    response = api_client.get("/non_existent_endpoint_12345")
    response.assert_status_code(404)
