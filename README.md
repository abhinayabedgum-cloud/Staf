# TalentSync — AI-Driven Talent and Resource Allocation Marketplace

TalentSync is an enterprise web application designed to match skilled employees to project demands using deterministic eligibility checks, date-range capacity management, approval workflows, and an evidence-grounded AI staffing assistant.

---

## Key Features

1. **Deterministic Candidate Matching**: Multi-criteria weighted scoring (Skills 50%, Availability 25%, Location 15%, Experience 10%).
2. **Date-Range Capacity Protection**: Prevents double-booking across arbitrary date intervals; rejects allocations exceeding 100% capacity.
3. **Approval & Governance**: Mandatory approver identity logging (`approvedBy`); allocation cancellation preserves historical records.
4. **Tool-Augmented AI Assistant**: Evidence-grounded conversational agent with controlled tool calls and simulated deterministic mode.
5. **Modern Glassmorphism UI**: 7 responsive screens (Dashboard, Demands, Employees, Skills Matrix, Resource Search, Allocations, AI Assistant).
6. **Comprehensive Automated Tests**: 13/13 passing JUnit 5 tests covering scenarios TC-06-01 to TC-06-12.

---

## Technology Stack

- **Backend**: Java 21, Spring Boot 3.2, Spring Data JPA, Hibernate, Maven 3.9
- **Database**: H2 in-memory (zero-configuration demo) / MySQL 8.x (production)
- **Frontend**: HTML5, Vanilla JavaScript (ES6+), Modern Glassmorphism CSS
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
The backend starts on **port 8080** and seeds synthetic demo employees, skills, and demands into memory.

### 2. Open the Frontend
Open the following file in your web browser:
```
C:\Users\ABHINAYA BEDGUM\Documents\assignment6\frontend\index.html
```
The sidebar status indicator will display **"API Online"** (green dot).

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

Detailed documentation is available in the `docs/` directory:
- [docs/PROJECT_PLAN.md](docs/PROJECT_PLAN.md) — Implementation sequence & risk matrix.
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — Multi-tier architecture & capacity algorithms.
- [docs/DATABASE_DESIGN.md](docs/DATABASE_DESIGN.md) — ER diagrams, schemas & indexes.
- [docs/API_SPECIFICATION.md](docs/API_SPECIFICATION.md) — REST endpoints & DTO contracts.
- [docs/TEST_PLAN.md](docs/TEST_PLAN.md) — TC-06-01 to TC-06-12 test matrix.
- [docs/AI_AGENT_DESIGN.md](docs/AI_AGENT_DESIGN.md) — Controlled AI tools & anti-hallucination guardrails.
