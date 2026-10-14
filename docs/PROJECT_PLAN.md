# Project Plan: AI-Driven Talent and Resource Allocation Marketplace

## 1. Executive Summary & Purpose
The **AI-Driven Talent and Resource Allocation Marketplace** is an enterprise workforce intelligence platform designed to systematically match skilled employees to project demands. The system eliminates staffing bottlenecks, over-allocation conflicts, and biased resource decisions by combining:
1. **Deterministic eligibility verification** (skills, proficiency, availability, and location).
2. **Multi-criteria ranking algorithms** (50% skills, 25% availability, 15% location, 10% validated experience).
3. **Rigorous capacity management** preventing allocation exceeding configured limits over arbitrary date ranges.
4. **Controlled, evidence-grounded AI staffing assistant** with explicit tool boundaries and a transparent fallback simulation mode.
5. **Role-based governance and auditability** preserving full allocation history upon cancellation.

---

## 2. Work Breakdown Structure & Implementation Phases

| Phase | Title | Scope & Key Deliverables | Status |
|:---:|---|---|:---:|
| **1** | **Environment & Project Scaffolding** | Verify Java 21, Maven 3.9+, Spring Boot 3.x dependencies, create multi-tier package structure, establish git tracking. | **Completed** |
| **2** | **Database Modeling & Persistence** | Define relational schema (EMPLOYEE, SKILL, EMPLOYEE_SKILL, PROJECT_DEMAND, ALLOCATION, AUDIT_LOG, USER). Configure dual persistence (H2 in-memory for testing, MySQL DDL for production). | **Completed** |
| **3** | **Employee & Skill Management APIs** | Implement CRUD REST endpoints for employees, skill catalog, and skill-to-employee mapping with proficiency (1–5) and validation evidence. | **Completed** |
| **4** | **Project Demand Management APIs** | Implement demand creation, validation (dates, allocation %, role), status lifecycles (OPEN, IN_PROGRESS, FULFILLED, CANCELLED). | **Completed** |
| **5** | **Candidate Eligibility & Ranking Engine** | Develop deterministic matching logic in `ResourceMatchingService`. Calculate date-range capacity, verify mandatory skills, and output itemized score breakdowns. | **Completed** |
| **6** | **Allocation Workflow & Concurrency** | Implement allocation requests, approval gates, overlap detection (`startA <= endB && endA >= startB`), anti-double booking validation, and cancellation history preservation. | **Completed** |
| **7** | **Enterprise Frontend UI** | Build component-based Single Page Application (HTML5, modern responsive CSS design system, Vanilla JS). 7 functional views: Dashboard, Demands, Employees, Skills, Search, Allocations, and AI Assistant. | **Completed** |
| **8** | **AI Staffing Agent & Controlled Tools** | Build tool-augmented assistant (`StaffingAgentService`) with deterministic grounding, evidence verification, and explicit missing-data disclosures. | **Completed** |
| **9** | **Automated Testing Suite** | Implement JUnit 5 test suite verifying all 12 core assignment scenarios (TC-06-01 to TC-06-12) plus concurrency and validation edge cases. | **Completed (13/13 Pass)** |
| **10** | **Documentation, Review & Demo Prep** | Create comprehensive technical documentation (`docs/*`, `README.md`), prepare code walkthrough script, and establish demo scenarios. | **Completed** |

---

## 3. Technology Stack & Dependencies

- **Programming Language**: Java 21 (Eclipse Adoptium OpenJDK 21.0.12)
- **Framework**: Spring Boot 3.2.x (Spring Web, Spring Data JPA, Spring Validation)
- **Database**: H2 Database (in-memory demo/testing) & MySQL 8.x (production deployment)
- **ORM / Persistence**: Hibernate 6.x, Jakarta Persistence API (JPA)
- **Validation**: Jakarta Bean Validation (Hibernate Validator)
- **Build Tool**: Apache Maven 3.9.9
- **Testing Framework**: JUnit 5 (Jupiter), AssertJ, Spring Boot Test
- **Frontend**: HTML5, Vanilla JavaScript (ES6+), Modern Glassmorphism CSS Design System
- **HTTP / REST**: RESTful JSON architecture with standard `ApiError` contracts

---

## 4. Risk Assessment & Mitigation Matrix

| Risk Identified | Impact | Probability | Mitigation Strategy |
|---|:---:|:---:|---|
| **Over-Allocation / Double Booking** | Critical | High | Mandatory database-level date-overlap query calculation; transactional validation checking that existing allocations + requested allocation <= 100% capacity. |
| **Concurrent Allocation Race Condition** | High | Medium | Enforce database transaction boundaries with `@Transactional` and capacity revalidation before allocation confirmation. |
| **AI Hallucination / Fabricated Credentials** | High | High | Restrict AI to controlled backend tool outputs only. Disallow autonomous database writes or approvals. Implement explicit simulated fallback disclosure. |
| **Data Loss on Allocation Cancellation** | High | Low | Soft-cancellation model: Mark status as `CANCELLED`, record `cancelledAt` and `reason`, release capacity, but never delete allocation records. |
| **Missing Skill Validation Evidence** | Medium | Medium | Require evidence reference strings for verified skills; distinguish explicitly between unverified skills and confirmed lack of proficiency. |

---

## 5. Acceptance Criteria Checklist

- [x] Backend compiles and passes all JUnit 5 test suites.
- [x] Zero external frontend framework dependencies (vanilla modern component architecture).
- [x] Mandatory skills strictly enforced (unqualified candidates excluded from eligible pool).
- [x] Capacity strictly calculated over exact date ranges.
- [x] Over-allocation (>100%) rejected with HTTP 400/409 error.
- [x] Allocation cancellation releases capacity while preserving historical records.
- [x] AI assistant produces verifiable, evidence-grounded outputs with no hallucinations.
- [x] 100% test pass rate across TC-06-01 through TC-06-12.
- [x] All 7 documentation files generated and verified.
