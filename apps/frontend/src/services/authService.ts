import {
  RegisterRequest, LoginRequest, TokenResponse, User,
  ForgotPasswordRequest, ResetPasswordRequest, VerifyEmailRequest
} from "../types/auth";

const API_BASE_URL = "http://localhost:8000/api/v1";

class AuthService {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem("smartbank_access_token");
    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    };
  }

  async register(data: RegisterRequest): Promise<User> {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.detail || "Registration failed");
    }
    return res.json();
  }

  async login(data: LoginRequest): Promise<TokenResponse> {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.detail || "Invalid credentials");
    }
    const tokenData: TokenResponse = await res.json();
    this.saveSession(tokenData);
    return tokenData;
  }

  async getCurrentUser(): Promise<User> {
    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: this.getAuthHeaders()
    });
    if (!res.ok) {
      throw new Error("Failed to fetch user profile");
    }
    return res.json();
  }

  async refreshToken(): Promise<TokenResponse> {
    const refreshToken = localStorage.getItem("smartbank_refresh_token");
    if (!refreshToken) throw new Error("No refresh token available");

    const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refreshToken })
    });
    if (!res.ok) {
      this.clearSession();
      throw new Error("Session expired. Please log in again.");
    }
    const tokenData: TokenResponse = await res.json();
    this.saveSession(tokenData);
    return tokenData;
  }

  async forgotPassword(data: ForgotPasswordRequest): Promise<{ message: string }> {
    const res = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.detail || "Request failed");
    }
    return res.json();
  }

  async resetPassword(data: ResetPasswordRequest): Promise<{ message: string }> {
    const res = await fetch(`${API_BASE_URL}/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.detail || "Password reset failed");
    }
    return res.json();
  }

  async verifyEmail(data: VerifyEmailRequest): Promise<User> {
    const res = await fetch(`${API_BASE_URL}/auth/verify-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.detail || "Email verification failed");
    }
    return res.json();
  }

  saveSession(tokenData: TokenResponse) {
    localStorage.setItem("smartbank_access_token", tokenData.access_token);
    localStorage.setItem("smartbank_refresh_token", tokenData.refresh_token);
    localStorage.setItem("smartbank_user", JSON.stringify(tokenData.user));
  }

  clearSession() {
    localStorage.removeItem("smartbank_access_token");
    localStorage.removeItem("smartbank_refresh_token");
    localStorage.removeItem("smartbank_user");
  }
}

export const authService = new AuthService();
