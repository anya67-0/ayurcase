import { User, UserRole } from '../types';
import { MOCK_USERS } from '../data/mockData';

const CURRENT_USER_KEY = 'ayurcase_current_user_v1';

export const authService = {
  getCurrentUser(): User {
    const stored = localStorage.getItem(CURRENT_USER_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        // fallback
      }
    }
    // Default to Dr. Ananya Sharma for seamless demo
    return MOCK_USERS[0];
  },

  setCurrentUser(user: User): void {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  },

  login(role: UserRole): User {
    let matchedUser = MOCK_USERS.find(u => u.role === role);
    if (!matchedUser) matchedUser = MOCK_USERS[0];
    this.setCurrentUser(matchedUser);
    return matchedUser;
  },

  loginWithEmail(email: string, role: UserRole): User {
    const user = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase() && u.role === role) 
      || MOCK_USERS.find(u => u.role === role) 
      || MOCK_USERS[0];
    this.setCurrentUser(user);
    return user;
  },

  loginWithAbha(abhaId: string): User {
    const patientUser = MOCK_USERS.find(u => u.role === 'patient') || {
      id: 'PAT-ABHA-01',
      name: 'Rahul Sharma',
      email: 'rahul.sharma@gmail.com',
      role: 'patient',
      abhaId: abhaId || '91-4521-8890-1234'
    };
    this.setCurrentUser(patientUser);
    return patientUser;
  },

  logout(): void {
    // Set to unauthenticated or back to default
    localStorage.removeItem(CURRENT_USER_KEY);
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem(CURRENT_USER_KEY);
  }
};
