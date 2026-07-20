# SmartBank Bharat AI — Enterprise Core Banking Database Architecture

**Author**: Principal Database Architect & Financial Data Engine Board  
**Target RDBMS**: Supabase PostgreSQL 15+  
**Standards**: Double-Entry Accounting Invariants, ISO 20022 Financial Messaging, PCI-DSS Level 1 Data Masking  

---

## 1. High-Level Entity Relationship Diagram (ERD)

```mermaid
erDiagram
    TENANTS ||--o{ USERS : "hosts"
    USERS ||--|| CUSTOMER_PROFILES : "owns"
    USERS ||--o{ ACCOUNTS : "holds"
    ACCOUNTS ||--o{ DOUBLE_ENTRY_LEDGER : "contains entries"
    ACCOUNTS ||--o{ TRANSACTIONS : "initiates/receives"
    ACCOUNTS ||--o{ CARDS : "issues"
    ACCOUNTS ||--o{ LOANS : "finances"
    ACCOUNTS ||--o{ FIXED_DEPOSITS : "secures"
    USERS ||--o{ AUDIT_LOGS : "generates"

    USERS {
        uuid id PK
        uuid tenant_id FK
        string email
        string password_hash
        string phone_number
        string role
        string account_status
        timestamp created_at
    }

    CUSTOMER_PROFILES {
        uuid id PK
        uuid user_id FK
        string pan_hash
        string aadhaar_vault_token
        string ckyc_number
        string v_kyc_status
        timestamp kyc_verified_at
    }

    ACCOUNTS {
        uuid id PK
        uuid user_id FK
        string account_number UK
        string ifsc_code
        numeric balance
        numeric available_balance
        string currency
        string account_type
        string branch_code
        timestamp created_at
    }

    DOUBLE_ENTRY_LEDGER {
        uuid id PK
        uuid transaction_id FK
        uuid account_id FK
        string entry_type
        numeric amount
        numeric running_balance
        timestamp entry_timestamp
    }

    TRANSACTIONS {
        uuid id PK
        string utr_number UK
        uuid sender_account_id FK
        uuid receiver_account_id FK
        string payment_mode
        numeric amount
        string status
        timestamp transaction_time
    }

    CARDS {
        uuid id PK
        uuid account_id FK
        string masked_pan
        string tokenized_pan_hash
        string card_network
        boolean is_frozen
        numeric daily_limit
    }

    LOANS {
        uuid id PK
        uuid account_id FK
        string loan_number UK
        numeric principal_amount
        numeric interest_rate
        numeric monthly_emi
        numeric outstanding_balance
        timestamp maturity_date
    }

    FIXED_DEPOSITS {
        uuid id PK
        uuid account_id FK
        string fd_number UK
        numeric principal_amount
        numeric interest_rate
        timestamp maturity_date
        boolean is_80c_tax_saver
    }

    AUDIT_LOGS {
        uuid id PK
        string table_name
        string operation_type
        jsonb old_data
        jsonb new_data
        uuid performed_by
        timestamp timestamp
    }
```

---

## 2. Table Specifications & Constraints Matrix

### Core Accounting & Financial Ledger Invariants
1. **Double-Entry Balance Rule**: Every financial event creates balanced debit and credit entries in `DOUBLE_ENTRY_LEDGER`. Sum of debits MUST equal sum of credits.
2. **Non-Negative Balance Constraint**: Savings accounts enforce `CHECK (balance >= 0)`. Overdraft/Current accounts enforce `CHECK (balance >= -max_overdraft_limit)`.

---

## 3. High-Velocity Partitioning Strategy

### Range Partitioning on Transactions & Ledger
To maintain sub-5 millisecond query performance across 500+ Million financial records:
- **`DOUBLE_ENTRY_LEDGER` Partition Key**: `entry_timestamp` (Monthly partitions: `ledger_y2026m01`, `ledger_y2026m02`, etc.).
- **`TRANSACTIONS` Partition Key**: `transaction_time` (Monthly partitions: `transactions_y2026m01`, etc.).

---

## 4. Supabase Row Level Security (RLS) Strategy

### RLS Access Policies

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                               SUPABASE RLS ACCESS CONTROL MATRIX                                 │
├───────────────────┬─────────────────────────────┬────────────────────────────────────────────────┤
│ Target Table      │ User Role Scope             │ Permitted Operation & RLS Condition            │
├───────────────────┼─────────────────────────────┼────────────────────────────────────────────────┤
│ ACCOUNTS          │ Retail Customer             │ SELECT WHERE user_id = auth.uid()              │
│ TRANSACTIONS      │ Retail Customer             │ SELECT WHERE sender_account_id IN (UserAccts)  │
│ CARDS             │ Retail Customer             │ SELECT/UPDATE WHERE account_id IN (UserAccts)  │
│ KYC_DOCUMENTS     │ Compliance Officer          │ SELECT/UPDATE WHERE role = 'COMPLIANCE'        │
│ AUDIT_LOGS        │ Super Admin                 │ SELECT ONLY (No UPDATE/DELETE Permitted)       │
└───────────────────┴─────────────────────────────┴────────────────────────────────────────────────┘
```

---

## 5. Audit Trail, History Tables & Soft Delete Strategy

1. **Change Data Capture (CDC) Audit Trigger**: Every `INSERT`, `UPDATE`, `DELETE` operation fires a trigger capturing `old_data` and `new_data` into immutable `AUDIT_LOGS`.
2. **Soft Delete Invariant**: Core financial records (`ACCOUNTS`, `USERS`, `CARDS`) are NEVER deleted physically. Soft deletion uses `deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL` with partial indexes `WHERE deleted_at IS NULL`.

---

## 6. Zero-Downtime Migration Strategy

1. **Expand and Contract Pipeline**:
   - **Phase 1 (Expand)**: Add new non-null columns as NULLABLE or with DEFAULT values.
   - **Phase 2 (Dual Write)**: Update application layer to write to both old and new schema structures.
   - **Phase 3 (Backfill)**: Run background migration scripts to backfill historical records.
   - **Phase 4 (Contract)**: Remove old column references cleanly after zero-error verification.

---

*Master Database Architecture | SmartBank Bharat AI Data Engine Board*
