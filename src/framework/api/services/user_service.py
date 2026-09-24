"""User API Service encapsulation for CRUD and business operations."""

from typing import Any

from pydantic import BaseModel

from framework.api.client import APIClient, APIResponse


class UserSchema(BaseModel):
    """Schema representing user entity."""

    id: int | None = None
    name: str
    username: str
    email: str


class UserService:
    """Business service layer for User API interactions."""

    ENDPOINT = "/users"

    def __init__(self, client: APIClient | None = None) -> None:
        self.client = client or APIClient()

    def get_all_users(self) -> APIResponse:
        """Fetch all users list."""
        return self.client.get(self.ENDPOINT)

    def get_user_by_id(self, user_id: int) -> APIResponse:
        """Fetch single user by ID."""
        return self.client.get(f"{self.ENDPOINT}/{user_id}")

    def create_user(self, name: str, username: str, email: str) -> APIResponse:
        """Create new user entity."""
        payload = {
            "name": name,
            "username": username,
            "email": email,
        }
        return self.client.post(self.ENDPOINT, json=payload)

    def update_user(self, user_id: int, data: dict[str, Any]) -> APIResponse:
        """Update existing user via PUT."""
        return self.client.put(f"{self.ENDPOINT}/{user_id}", json=data)

    def patch_user(self, user_id: int, data: dict[str, Any]) -> APIResponse:
        """Partial update user via PATCH."""
        return self.client.patch(f"{self.ENDPOINT}/{user_id}", json=data)

    def delete_user(self, user_id: int) -> APIResponse:
        """Delete user by ID."""
        return self.client.delete(f"{self.ENDPOINT}/{user_id}")
