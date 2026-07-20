# SmartBank Bharat AI — Master UI/UX Design System & Screen Specification

**Author**: Chief UI/UX Design Officer & FinTech Aesthetics Board  
**Aesthetic Standard**: Apple HIG + CRED Obsidian Glass + Revolut 3D Metal + Stripe Precision  

---

## 1. Design Token Engine & Typography System

### Color Palettes & Lighting Tokens

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                               LIQUID GLASS DESIGN TOKEN SYSTEM                                   │
├───────────────────┬───────────────────────────────────┬──────────────────────────────────────────┤
│ Token Name        │ Dark Mode (Obsidian Glass)        │ Light Mode (Quartz Glass)                │
├───────────────────┼───────────────────────────────────┼──────────────────────────────────────────┤
│ Base Background   │ #080A0F (Deep Space Obsidian)     │ #F8FAFC (Pure Quartz Slate)              │
│ Surface Glass     │ rgba(15, 23, 42, 0.65) + Blur 24px │ rgba(255, 255, 255, 0.75) + Blur 24px    │
│ Border Highlight  │ rgba(255, 255, 255, 0.12)         │ rgba(0, 0, 0, 0.08)                      │
│ Primary Accent    │ #00F2FE → #4FACFE (Cyan Electric) │ #0284C7 → #0369A1 (Deep Sapphire)        │
│ Bharat Emerald    │ #10B981 → #059669 (Rupee Green)   │ #059669 → #047857 (Emerald Leaf)         │
│ Imperial Gold     │ #F59E0B → #D97706 (Sovereign Gold)│ #D97706 → #B45309 (Warm Amber)           │
└───────────────────┴───────────────────────────────────┴──────────────────────────────────────────┘
```

### Typography Hierarchy
- **UI & Display**: *Inter* / *San Francisco Pro* (Weights: 400, 500, 600, 700, 800, 900).
- **Ledgers & Currency**: *JetBrains Mono* (Weights: 500, 700) for exact alignment of `₹` INR values, IFSC strings, and PAN numbers.

---

## 2. Comprehensive Screen Design Specifications

### Screen 1: Customer Cockpit & Portfolio Vault
- **Hero Canvas**: 3D Parallax floating container displaying Total Net Worth `₹14,89,200.45` with animated GSAP wave charts.
- **Quick Action Bar**: 4-Pill Action Row featuring **UPI QR Pay**, **NEFT/IMPS Transfer**, **RuPay Card Controls**, and **Instant Credit Line**.
- **Interactive Ledger**: Instant-search passbook stream with vendor icons (Zomato, TCS, BESCOM) and status badges.

---

### Screen 2: UPI 2.0 & Instant Payment Rail
- **Holographic Scanner**: Circular camera viewport with neon cyan scanning beam for instant QR code detection.
- **VPA Auto-Complete**: Dynamic dropdown showing saved contacts, recent UPI handles (`username@smartbank`), and phone contacts.
- **Mandate Manager**: List of active UPI AutoPay subscriptions (Netflix, Mutual Fund SIPs) with 1-tap pause/cancel controls.

---

### Screen 3: RuPay 3D Metal Cards & Virtual Card Vault
- **3D Card Visualizer**: Interactive Three.js metallic card canvas with real-time cursor rotation tilt, EMV chip glow, and RuPay Platinum NCMC branding.
- **Card Controls**: Instant freeze toggle, 60-second masked CVV reveal timer, international POS spend velocity sliders.

---

### Screen 4: Instant AI Credit Line & Loan Studio
- **EMI Dial**: Circular slider allowing users to adjust loan amounts (₹50,000 to ₹25,000,000) and tenure (6 to 60 months) with real-time monthly EMI updates.
- **Disbursement Canvas**: 1-Tap loan claim with instant confetti animation and real-time bank vault credit confirmation.

---

### Screen 5: Wealth Management, Mutual Funds & Sovereign Gold
- **Direct SIP Hub**: Portfolio pie chart with breakdown across Large Cap, Flexi Cap, and Debt funds.
- **Sovereign Gold Bonds (SGB)**: 3D Gold coin weight visualizer tracking total grams held and interest payout schedule.

---

### Screen 6: Safe Deposit Locker & Physical Asset Vault
- **Digital Biometric Key**: Animated fingerprint & Face ID authentication prompt for digital locker access.
- **CCTV Security Feed**: Live simulated feed of branch locker vault with timestamp and dual-custody approval status.

---

### Screen 7: Staff Operations Cockpit (Employee Portal)
- **eKYC Split Inspector**: Dual-pane document inspector displaying customer Aadhaar/PAN upload alongside live AI Liveness verification score (98.4%).
- **Account Freeze Controls**: 1-Tap AML security hold buttons with compliance reason logging.

---

### Screen 8: Branch Treasury & Underwriting (Manager Portal)
- **Branch Liquidity Canvas**: Real-time branch reserve monitor showing active cash-in-vault vs pending credit disbursements.
- **Fraud Radar**: Anomaly matrix flagging high-velocity transactions across geographic locations.

---

### Screen 9: Global Command Center (Admin Portal)
- **System Telemetry**: Real-time throughput gauge monitoring FastAPI RPS (8,400 req/sec) and Supabase DB connection pool health.
- **Kill-Switch Control**: Emergency global wire lockdown switch with dual-key super-admin override.

---

### Screen 10: Kiosk Self-Service Touch Screen
- **Touch Navigation**: Ultra-large high-contrast buttons designed for 4K physical touchscreens in bank branches.
- **Passbook Printer Simulator**: Animated receipt feed showing page printing progress.

---

### Screen 11: 3D ATM Simulation Engine
- **Card Slot**: Interactive 3D ATM fascia with flashing green insertion guide.
- **Tactile Keypad**: On-screen PIN pad with haptic sound feedback and instant receipt generator.

---

### Screen 12: Dispute & Complaint Resolution Engine
- **SLA Countdown**: Ticket escalation timer showing remaining hours before RBI Ombudsman auto-escalation.

---

### Screen 13: Theme Token Customizer Engine
- **Theme Switcher**: Instant transition toggle between **Obsidian Dark Glass** and **Quartz Light Glass**.

---

*Master UI/UX Specification | SmartBank Bharat AI Design Board*
