# System Architecture: AI-Driven Talent and Resource Allocation Marketplace

## 1. Architectural Philosophy
The system follows an **enterprise-grade, layered monolithic architecture** prioritizing:
1. **Separation of Concerns**: Strict boundary enforcement between presentation, REST controllers, business services, domain entities, and data access repositories.
2. **Deterministic Core**: All business rules (eligibility, scoring, capacity, approval, cancellation) reside strictly in Java backend services—never delegated to client-side logic or generative AI.
3. **Auditability & Immutability**: Historical allocations are preserved perpetually; state transitions are recorded with actor identities and timestamps.
4. **Tool-Augmented AI**: The AI subsystem operates as a read-only, controlled tool executor grounded in factual application state.

---

## 2. Multi-Tier Layering Diagram

```
+------------------------------------------------------------------------+
|                          CLIENT PRESENTATION                           |
|       Vanilla ES6 SPA | Responsive Glassmorphism CSS | DOM Router       |
+-----------------------------------+------------------------------------+
                                    | HTTP / REST (JSON)
                                    v
+------------------------------------------------------------------------+
|                             API LAYER                                  |
|   EmployeeCtrl | DemandCtrl | AllocationCtrl | SkillCtrl | AiCtrl     |
|   WebConfig (CORS) | GlobalExceptionHandler | DTO Request/Response     |
+-----------------------------------+------------------------------------+
                                    | Service Calls
                                    v
+------------------------------------------------------------------------+
|                           BUSINESS LAYER                               |
|   EmployeeService      | DemandService         | AllocationService     |
|   ResourceMatchingSvc  | CapacityCalculation   | StaffingAgentService  |
+-----------------------------------+------------------------------------+
                                    | Spring Data JPA
                                    v
+------------------------------------------------------------------------+
|                         PERSISTENCE LAYER                              |
|   Repositories (EmployeeRepo, DemandRepo, AllocationRepo, SkillRepo)  |
|   Hibernate ORM | Transaction Management (@Transactional)              |
+-----------------------------------+------------------------------------+
                                    | JDBC
                                    v
+------------------------------------------------------------------------+
|                         DATABASE STORAGE                               |
|   H2 In-Memory (Dev/Test Mode)  <--->  MySQL 8.x (Production Mode)     |
+------------------------------------------------------------------------+
```

---

## 3. Core Component Workflows

### 3.1 Candidate Matching & Recommendation Workflow
```
Client (POST /api/demands/{id}/recommendations)
  --> DemandController.getRecommendations(demandId)
      --> ResourceMatchingService.findMatchesForDemand(demand)
          1. Load all ACTIVE employees
          2. Calculate exact date-range availability:
             availableCapacity = maxCapacity - sum(active overlapping allocations)
          3. Evaluate mandatory skills against minimum required proficiency
          4. Evaluate location compatibility (Exact match = 100, Remote/Global = 80, Mismatch = 20)
          5. Calculate multi-criteria weighted score:
             Total = (SkillScore * 0.50) + (AvailScore * 0.25) + (LocScore * 0.15) + (ExpScore * 0.10)
          6. Filter & rank candidates deterministically
  <-- Returns List<CandidateRecommendationResponse> with itemized breakdown
```

### 3.2 Allocation & Approval Lifecycle
```
[DRAFT / REQUESTED] 
       |
       v (Verify eligibility, check dates & capacity <= 100%)
[CONFIRMED / APPROVED] <--- Recorded with approvedBy and timestamp
       |
       v (Cancellation requested)
[CANCELLED] <--- Capacity released immediately, historical record retained
```

---

## 4. Date-Range Overlap & Capacity Calculation Algorithm
Two allocation periods $[S_1, E_1]$ and $[S_2, E_2]$ overlap if and only if:
$$\text{Overlap} \iff (S_1 \le E_2) \land (E_1 \ge S_2)$$

For an employee $e$ requesting $P_{\text{req}}\%$ allocation between $S_{\text{req}}$ and $E_{\text{req}}$:
1. Active allocations are queried:
   $$\mathcal{A}_{\text{active}} = \{ a \in \text{Allocations}(e) \mid a.\text{status} = \text{'CONFIRMED'} \land a.\text{startDate} \le E_{\text{req}} \land a.\text{endDate} \ge S_{\text{req}} \}$$
2. Committed capacity on overlapping dates:
   $$C_{\text{committed}} = \sum_{a \in \mathcal{A}_{\text{active}}} a.\text{allocationPercent}$$
3. Available capacity:
   $$C_{\text{available}} = C_{\text{max}}(e) - C_{\text{committed}}$$
4. **Validation Gate**:
   If $P_{\text{req}} > C_{\text{available}}$, transaction rolls back with a `BusinessRuleException` (HTTP 400).

---

## 5. Security & Role-Based Access Control (RBAC)
- **ADMIN**: User/config management, employee CRUD, demand CRUD, allocation review, audit view.
- **RESOURCE_MANAGER**: Demand creation, candidate searching, allocation requests, staffing advice.
- **APPROVER**: Reviewing allocation requests, confirming or rejecting, capacity re-verification.
- **EMPLOYEE**: Self-profile view, own skills, own assigned allocations.
