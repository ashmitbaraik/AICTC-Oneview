# AICTE OneView — Integrated Complaint Monitoring & Overlap Prevention System

> **Smart India Hackathon 2026**  
> **Problem Statement ID:** SIH26264  
> **Problem Statement Title:** Integrated Dashboard for Monitoring and Tracking Institution-Related Complaint Cases Across AICTE Bureaus/Cells  
> **Theme:** Smart Automation  
> **Category:** Software  
> **Team Name:** TENET  

---

## 📌 Executive Summary

The All India Council for Technical Education (AICTE) receives grievances and regulatory complaints regarding technical institutions through disparate channels—notably the **Regulation Bureau (RB)**, **Public Grievance Redressal Cell (PGRC)**, **Academic Planning**, and **Regional Offices**.

Due to the absence of a centralized, real-time coordination mechanism, complaints concerning the same institution are frequently handled in silos by different cells. This leads to:
- Overlapping inquiries and duplicated effort
- Conflicting notices/orders issued to institutions
- Delays in resolution and poor SLA accountability
- Difficulty in pinpointing case ownership

**AICTE OneView** solves this challenge by serving as an **institution-centric single source of truth** that brings all complaints under a unified umbrella, powered by a **Cross-Bureau AI Overlap Detection Engine** that detects duplication across bureaus and alerts officers with human-in-the-loop oversight.

---

## 🚀 Key Modules & Features

### 1. Centralized Institution Profile
- Unique **AICTE Permanent ID** (e.g., `1-1000001`) linking all cases
- Campus profile header with affiliation status, contact, principal details, and campus visuals
- Complete institutional complaint history and category distribution breakdown

### 2. Multi-Role Executive Dashboard
- **7 Metric KPI Trackers**: Total Complaints, Pending, Under Process, Disposed, Transferred, Overdue, and Potential Overlaps
- **Interactive Multi-Line Trends**: 6-month resolution progress
- **Bureau-wise Distribution Donut**: Real-time intake breakdown (RB 32%, PGRC 24%, Other Cells 18%, Regional Offices 14%, etc.)
- **Workload Bar Chart**: Pending vs. Disposed across each bureau/cell
- **Quick Alerts Feed**: Immediate warnings for 7-day deadlines and overdue cases

### 3. AI-Powered Overlap Detection Engine (Core Innovation)
- **Multi-Factor Scoring Algorithm**:
  - Exact & Fuzzy **AICTE Permanent ID / Institution Name** matching
  - **Cross-Bureau Discrepancy** identification (e.g. RB vs PGRC)
  - **Regulatory Category** correlation (Academic, Affiliation, Infrastructure, etc.)
  - **NLP Semantic Keyword Extraction** on complaint title & descriptions
- **Similarity Gauge & Checklist**: Real-time 0–100% score (e.g., 87%) with transparent matching criteria
- **Human Oversight Review**: Side-by-side comparison drawer where officials record coordination decisions (*Mark as Related* vs *Dismiss*) with audit remarks—**preventing erroneous auto-merging**

### 4. Complaint Registry & Tracking
- Universal search and multi-dimensional filters (Bureau, Status, Category, Priority, Date Range)
- Complete lifecycle stepper: Registered → Assigned → Under Process → Document Audit → Disposed
- Action Drawer: Update Status, Reassign, Add Comments, and Upload Documents
- CSV spreadsheet export for official reporting

### 5. Action History & Audit Log
- Chronological, tamper-evident audit trail for DPDP Act 2023 compliance
- Logs actor names, bureaus, timestamps, and action types (*Status Update*, *Comment*, *Assignment*, *Action Taken*)

### 6. Analytics & Performance Reports
- Average resolution time benchmark (7.4 days)
- Category-wise breakdown & top 5 most complained institutions
- Downloadable official PDF/Excel reports (Monthly Summary, Bureau Analysis, Resolution Time)

### 7. User Management & Role-Based Access Control (RBAC)
- 1-click persona switcher:
  - **Admin (AICTE HQ)**: Full system access & case reassignment
  - **Bureau/Cell Officer (RB / PGRC)**: Operational workflow & overlap decisions
  - **Senior Management**: Executive view-only dashboard with SLA analytics

---

## 💻 Tech Stack (Slide 3 Mapping)

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, Vite, Recharts, Lucide Icons, Custom Design System |
| **Backend** | Node.js REST API, CORS, Event Engine |
| **AI / Logic** | Semantic Keyword Tokenization, Jaccard Similarity, Rule-based Engine |
| **Design** | Pixel-perfect responsive interface matching AICTE OneView blueprints |

---

## 🏃 How to Run the Project

### 1. Launch the Frontend
```bash
cd frontend
npm run dev
```
Open your browser at: `http://localhost:5173`

### 2. (Optional) Run the Backend REST API
```bash
cd backend
npm start
```
The backend API server runs at: `http://localhost:5000`  
Health check endpoint: `http://localhost:5000/api/health`

---

## 🎯 Smart India Hackathon Demo Script (3-Minute Pitch)

1. **The Problem (30s)**: Show the Login screen with quick personas. Explain how RB and PGRC receive separate complaints for the same institution without knowing about each other.
2. **Dashboard Overview (45s)**: Navigate to Dashboard. Point out the 7 KPI cards, the 18 Potential Overlaps badge, and the Bureau Distribution chart.
3. **Core Innovation — Overlap Detection (60s)**: Open **Potential Overlap Detection**. Show the side-by-side comparison between Case `C-2024-0789` (RB) and Case `C-2024-0823` (PGRC). Highlight the **87% Similarity Score** and explain the multi-factor matching reasons. Submit a coordination decision (*Mark as Related*).
4. **Institution 360° Profile (30s)**: Click on **Institution Directory** → **BIT Sindri**. Show the campus banner, active complaints breakdown, category donut chart, and timeline.
5. **Impact & Compliance (15s)**: Highlight DPDP Act 2023 audit compliance in **Action History** and export capabilities in **Analytics & Reports**.
