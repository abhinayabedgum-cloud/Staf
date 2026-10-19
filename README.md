# SkillMatch — AI-Driven Resource Allocation & Workforce Staffing Marketplace

SkillMatch is an enterprise talent allocation platform that matches employees to project demands using deterministic multi-criteria scoring, date-range capacity protection, manager approval workflows, and an evidence-grounded AI staffing assistant.

---

## Key Features

1. **Deterministic Candidate Matching**: Multi-criteria weighted scoring (Skills 50%, Availability 25%, Location 15%, Experience 10%).
2. **Candidate Comparison & Benchmarking**: Side-by-side candidate comparison against project demands with skill match highlights and gap analysis.
3. **Date-Range Capacity Protection**: Prevents double-booking across arbitrary date windows; enforces capacity constraints and prevents over-allocation (>100%).
4. **Manager Approval & Governance Workflow**: 
   - 4-card interactive KPI filter (`Total Requests`, `Approved`, `Pending`, `Rejected`).
   - Clean pending approval review queue with quick `Review` and `Reject` actions.
   - Comprehensive audit log with cancellation reason logging and approver attribution.
5. **Employee Workforce Portal**: Self-service portal for employees to manage availability status, profile details, and skill proficiencies.
6. **AI Assistant & Floating Copilot**: Evidence-grounded conversational assistant with controlled tool calls, plus a global floating AI widget with quick prompt chips.
7. **Utilization & Skill-Gap Dashboard**: Real-time capacity breakdown by department, talent deficits matrix, and bench capacity gauges.
8. **Modern Enterprise SaaS UI**: Clean, responsive layout with compact date ranges, modern button styles, and zero-clutter typography.
9. **Automated Test Suite**: 13/13 passing JUnit 5 tests covering scenarios TC-06-01 to TC-06-12.

---

## 8 Core Application Modules

| Module | Route | Purpose |
| :--- | :--- | :--- |
| **Demand Intake** | `#demands` | Create and review project staffing demands with required skills, priority, and allocation targets. |
| **Skill Matrix** | `#skills` | Organization-wide matrix tracking employee skill proficiencies across categories (L1–L3). |
| **Resource Search** | `#search` | Multi-filter talent search by skill, location, availability, and department. |
| **Candidate Comparison** | `#compare` | Side-by-side candidate ranking against specific demands to pick top matches. |
| **Allocation Approval** | `#allocations` | Manager decision queue with KPI cards, review/reject modals, and committed audit log. |
| **Utilization Dashboard** | `#dashboard` | Workforce utilization rates, departmental workload distribution, and bench capacity metrics. |
| **Employee Portal** | `#portal` | Employee self-service profile and availability management. |
| **AI Assistant** | `#ai` | Conversational staffing copilot with controlled backend tools and instant recommendation chips. |

---

## Technology Stack

- **Backend**: Java 21, Spring Boot 3.2, Spring Data JPA, Hibernate, Maven 3.9
- **Database**: H2 in-memory (demo/dev) / MySQL 8.x (production ready)
- **Frontend**: HTML5, Vanilla JavaScript (ES6+), Modern Responsive CSS
- **Testing**: JUnit 5, AssertJ, Spring Boot Test

---

## Prerequisites

- Java 21 OpenJDK (`Adoptium` or `OpenJDK`)
- Apache Maven 3.9.x
- Any modern web browser (Chrome, Edge, Firefox)

---

## Quick Start Guide

### 1. Start the Backend Server
From the project root directory, run:
```powershell
cd "C:\Users\ABHINAYA BEDGUM\Documents\assignment6"
& "C:\Users\ABHINAYA BEDGUM\Documents\maven\apache-maven-3.9.9\bin\mvn.cmd" spring-boot:run
```
The server starts on **http://localhost:8080** and seeds initial demo employees, skills, demands, and allocations.

### 2. Open the Application
Open your web browser and navigate to:
```
http://localhost:8080
```
The status indicator in the bottom-left sidebar will display **"API Online"** (green dot).

### 3. Run the Automated Tests
```powershell
& "C:\Users\ABHINAYA BEDGUM\Documents\maven\apache-maven-3.9.9\bin\mvn.cmd" test
```
Expected Output:
```
[INFO] Tests run: 13, Failures: 0, Errors: 0, Skipped: 0
[INFO] BUILD SUCCESS
```

---

## Architecture Documentation

Detailed architectural documentation is available in the `docs/` directory:
- [docs/PROJECT_PLAN.md](docs/PROJECT_PLAN.md) — Implementation sequence & risk matrix.
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — Multi-tier architecture & capacity algorithms.
- [docs/DATABASE_DESIGN.md](docs/DATABASE_DESIGN.md) — ER diagrams, schemas & indexes.
- [docs/API_SPECIFICATION.md](docs/API_SPECIFICATION.md) — REST endpoints & DTO contracts.
- [docs/TEST_PLAN.md](docs/TEST_PLAN.md) — TC-06-01 to TC-06-12 test matrix.
- [docs/AI_AGENT_DESIGN.md](docs/AI_AGENT_DESIGN.md) — Controlled AI tools & anti-hallucination guardrails.
