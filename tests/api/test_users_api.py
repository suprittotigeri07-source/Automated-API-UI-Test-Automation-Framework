"""API test suite for User CRUD and schema validation."""

import pytest

from framework.api.services.user_service import UserSchema, UserService
from framework.utils.helpers import generate_random_email, generate_random_string


@pytest.mark.api
@pytest.mark.smoke
def test_get_all_users(user_service: UserService) -> None:
    """Verify retrieving list of all users returns HTTP 200 and populated list."""
    response = user_service.get_all_users()

    response.assert_status_code(200)
    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0

    # Validate first user against UserSchema
    first_user = UserSchema.model_validate(data[0])
    assert first_user.id is not None
    assert first_user.name
    assert first_user.email


@pytest.mark.api
@pytest.mark.regression
def test_get_single_user_by_id(user_service: UserService) -> None:
    """Verify retrieving specific user by ID returns HTTP 200 and matching entity."""
    user_id = 1
    response = user_service.get_user_by_id(user_id)

    response.assert_status_code(200)
    user = response.validate_schema(UserSchema)
    assert user.id == user_id
    assert user.name


@pytest.mark.api
@pytest.mark.smoke
def test_create_user(user_service: UserService) -> None:
    """Verify creating user via POST returns HTTP 201 and created resource details."""
    unique_name = f"TestUser_{generate_random_string(5)}"
    unique_username = f"user_{generate_random_string(5).lower()}"
    unique_email = generate_random_email()

    response = user_service.create_user(
        name=unique_name,
        username=unique_username,
        email=unique_email,
    )

    response.assert_status_code(201)
    created_user = response.validate_schema(UserSchema)
    assert created_user.name == unique_name
    assert created_user.username == unique_username
    assert created_user.email == unique_email
    assert created_user.id is not None


@pytest.mark.api
@pytest.mark.regression
def test_update_user(user_service: UserService) -> None:
    """Verify updating user details via PUT returns HTTP 200 and updated fields."""
    user_id = 1
    updated_name = "Updated Automation Name"
    updated_payload = {
        "name": updated_name,
        "username": "updated_user",
        "email": "updated@example.com",
    }

    response = user_service.update_user(user_id, updated_payload)

    response.assert_status_code(200)
    data = response.json()
    assert data["name"] == updated_name


@pytest.mark.api
@pytest.mark.regression
def test_delete_user(user_service: UserService) -> None:
    """Verify deleting user returns HTTP 200."""
    user_id = 1
    response = user_service.delete_user(user_id)
    response.assert_status_code(200)
