/**
 * Authentication service isolating backend communication and session storage.
 */

const STORAGE_KEY = 'testpilot_user';

export const authService = {
  getCurrentUser() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  async login(email, password) {
    // Simulate backend network latency
    await new Promise((r) => setTimeout(r, 400));

    if (password === 'fail') {
      throw new Error('Invalid email or password combination.');
    }

    const user = {
      id: 'usr_9482',
      name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) || 'Alex Morgan',
      email: email,
      role: 'Staff QA Engineer',
      organization: 'Acme Software',
      token: 'jwt_tp_' + Math.random().toString(36).substring(2),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return user;
  },

  async register(fullName, email, password) {
    await new Promise((r) => setTimeout(r, 500));

    const user = {
      id: 'usr_' + Math.random().toString(36).substring(2, 8),
      name: fullName,
      email: email,
      role: 'Lead QA Engineer',
      organization: 'Independent Workspace',
      token: 'jwt_tp_' + Math.random().toString(36).substring(2),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return user;
  },

  async logout() {
    localStorage.removeItem(STORAGE_KEY);
  },
};
