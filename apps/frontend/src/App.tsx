import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./routes/ProtectedRoute";

// Auth Pages
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { ForgotPasswordPage } from "./pages/auth/ForgotPasswordPage";
import { VerifyEmailPage } from "./pages/auth/VerifyEmailPage";

// Customer Pages
import { CustomerDashboardPage } from "./pages/customer/CustomerDashboardPage";
import { CustomerAccountsPage } from "./pages/customer/CustomerAccountsPage";
import { CustomerTransactionsPage } from "./pages/customer/CustomerTransactionsPage";
import { CustomerCardsPage } from "./pages/customer/CustomerCardsPage";
import { CustomerLoansPage } from "./pages/customer/CustomerLoansPage";
import { CustomerBeneficiariesPage } from "./pages/customer/CustomerBeneficiariesPage";
import { CustomerDepositsPage } from "./pages/customer/CustomerDepositsPage";
import { CustomerNotificationsPage } from "./pages/customer/CustomerNotificationsPage";
import { CustomerSettingsPage } from "./pages/customer/CustomerSettingsPage";
import { AIAssistantPage } from "./pages/customer/AIAssistantPage";

// Employee Portal Pages
import { EmployeeDashboardPage } from "./pages/employee/EmployeeDashboardPage";
import { EmployeeKYCPage } from "./pages/employee/EmployeeKYCPage";
import { EmployeeAccountsPage } from "./pages/employee/EmployeeAccountsPage";
import { EmployeeTransactionsPage } from "./pages/employee/EmployeeTransactionsPage";
import { EmployeeComplaintsPage } from "./pages/employee/EmployeeComplaintsPage";
import { EmployeeReportsPage } from "./pages/employee/EmployeeReportsPage";

// Manager Portal Pages
import { ManagerDashboardPage } from "./pages/manager/ManagerDashboardPage";
import { ManagerLoanApprovalPage } from "./pages/manager/ManagerLoanApprovalPage";
import { ManagerAnalyticsPage } from "./pages/manager/ManagerAnalyticsPage";
import { ManagerFraudPage } from "./pages/manager/ManagerFraudPage";
import { ManagerEmployeePage } from "./pages/manager/ManagerEmployeePage";
import { ManagerReportsPage } from "./pages/manager/ManagerReportsPage";

// Admin Portal Pages
import { AdminDashboardPage } from "./pages/admin/AdminDashboardPage";
import { AdminUsersPage } from "./pages/admin/AdminUsersPage";
import { AdminEmployeesPage } from "./pages/admin/AdminEmployeesPage";
import { AdminBankSettingsPage } from "./pages/admin/AdminBankSettingsPage";
import { AdminInterestRatesPage } from "./pages/admin/AdminInterestRatesPage";
import { AdminAuditLogsPage } from "./pages/admin/AdminAuditLogsPage";
import { AdminSystemHealthPage } from "./pages/admin/AdminSystemHealthPage";
import { AdminAnalyticsPage } from "./pages/admin/AdminAnalyticsPage";
import { AdminNotificationsPage } from "./pages/admin/AdminNotificationsPage";
import { AdminThemeSettingsPage } from "./pages/admin/AdminThemeSettingsPage";

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />

          {/* Protected Customer Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<CustomerDashboardPage />} />
            <Route path="/vaults" element={<CustomerAccountsPage />} />
            <Route path="/transactions" element={<CustomerTransactionsPage />} />
            <Route path="/cards" element={<CustomerCardsPage />} />
            <Route path="/loans" element={<CustomerLoansPage />} />
            <Route path="/beneficiaries" element={<CustomerBeneficiariesPage />} />
            <Route path="/deposits" element={<CustomerDepositsPage />} />
            <Route path="/notifications" element={<CustomerNotificationsPage />} />
            <Route path="/settings" element={<CustomerSettingsPage />} />
            <Route path="/copilot" element={<AIAssistantPage />} />
          </Route>

          {/* Protected Employee Portal Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/employee/dashboard" element={<EmployeeDashboardPage />} />
            <Route path="/employee/kyc" element={<EmployeeKYCPage />} />
            <Route path="/employee/accounts" element={<EmployeeAccountsPage />} />
            <Route path="/employee/transactions" element={<EmployeeTransactionsPage />} />
            <Route path="/employee/complaints" element={<EmployeeComplaintsPage />} />
            <Route path="/employee/reports" element={<EmployeeReportsPage />} />
          </Route>

          {/* Protected Manager Portal Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/manager/dashboard" element={<ManagerDashboardPage />} />
            <Route path="/manager/loans" element={<ManagerLoanApprovalPage />} />
            <Route path="/manager/analytics" element={<ManagerAnalyticsPage />} />
            <Route path="/manager/fraud" element={<ManagerFraudPage />} />
            <Route path="/manager/employees" element={<ManagerEmployeePage />} />
            <Route path="/manager/reports" element={<ManagerReportsPage />} />
          </Route>

          {/* Protected Admin Portal Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="/admin/users" element={<AdminUsersPage />} />
            <Route path="/admin/employees" element={<AdminEmployeesPage />} />
            <Route path="/admin/bank-settings" element={<AdminBankSettingsPage />} />
            <Route path="/admin/rates" element={<AdminInterestRatesPage />} />
            <Route path="/admin/audit-logs" element={<AdminAuditLogsPage />} />
            <Route path="/admin/health" element={<AdminSystemHealthPage />} />
            <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
            <Route path="/admin/notifications" element={<AdminNotificationsPage />} />
            <Route path="/admin/theme" element={<AdminThemeSettingsPage />} />
          </Route>

          {/* Default Redirect */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
