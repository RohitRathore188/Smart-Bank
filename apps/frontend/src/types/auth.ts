export enum UserRole {
  RETAIL_USER = "RETAIL_USER",
  BUSINESS_EMPLOYEE = "BUSINESS_EMPLOYEE",
  BUSINESS_CFO = "BUSINESS_CFO",
  COMPLIANCE_AUDITOR = "COMPLIANCE_AUDITOR",
  SUPER_ADMIN = "SUPER_ADMIN"
}

export enum AccountStatus {
  PENDING_VERIFICATION = "PENDING_VERIFICATION",
  ACTIVE = "ACTIVE",
  SUSPENDED = "SUSPENDED",
  BLOCKED = "BLOCKED"
}

export interface User {
  id: string;
  tenant_id: string;
  email: string;
  first_name: string;
  last_name: string;
  roles: UserRole[];
  status: AccountStatus;
  is_email_verified: boolean;
  mfa_enabled: boolean;
  created_at: string;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  user: User;
}

export interface RegisterRequest {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  workspace_name?: string;
  account_type?: "RETAIL" | "BUSINESS";
}

export interface LoginRequest {
  email: string;
  password: string;
  device_fingerprint?: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  new_password: string;
}

export interface VerifyEmailRequest {
  token: string;
}
