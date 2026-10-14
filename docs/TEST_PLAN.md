# Automated Test Plan: AI-Driven Talent and Resource Allocation Marketplace

## 1. Test Strategy Overview
The automated testing suite ensures strict conformance to all enterprise requirements, edge cases, and concurrency boundaries. Testing is executed using **JUnit 5 (Jupiter)** and **Spring Boot Test** with an in-memory transactional database.

---

## 2. Test Matrix: Mandatory Scenarios (TC-06-01 to TC-06-12)

| Test ID | Method Name | Description | Verification Criteria | Status |
|---|---|---|---|:---:|
| **TC-06-01** | `TC_06_01_createDemandWithValidFields` | Create a project demand with valid dates and role. | Demand is persisted with generated ID and status `OPEN`. | **PASS** |
| **TC-06-02** | `TC_06_02_createDemandMissingRole_shouldBeRejected` | Submit demand creation request with empty role string. | Rejected with HTTP 400 (`ValidationException`). | **PASS** |
| **TC-06-02b** | `TC_06_02b_createDemandInvalidDates_shouldBeRejected` | Submit demand with `startDate > endDate`. | Rejected with HTTP 400 (`BusinessRuleException`). | **PASS** |
| **TC-06-03** | `TC_06_03_searchCandidatesFollowsRanking` | Evaluate candidate matching ranking order. | Candidates are sorted descending by calculated score. | **PASS** |
| **TC-06-04** | `TC_06_04_candidateLacksMandatorySkill_isFlagged` | Candidate missing required skill. | Flagged with `meetsSkillRequirements = false`. | **PASS** |
| **TC-06-05** | `TC_06_05_candidateFullyAllocated_isUnavailableForConflict` | Employee allocated 100% on overlapping dates. | Available capacity reported as 0%; conflict flagged. | **PASS** |
| **TC-06-06** | `TC_06_06_candidatePartialAvailability_reportedAccurately` | Employee committed to 40% allocation. | Available capacity reported accurately as 60%. | **PASS** |
| **TC-06-07** | `TC_06_07_confirmAllocationAfterApproval_isPersisted` | Valid allocation with required approver identity. | Status `CONFIRMED`, `approvedBy` stored, capacity recalculated. | **PASS** |
| **TC-06-08** | `TC_06_08_allocateAboveCapacity_isRejected` | Attempt to allocate 60% to employee with 50% available. | Rejected with HTTP 400 BusinessRuleException. | **PASS** |
| **TC-06-09** | `TC_06_09_aiRecommendationIncludesEvidenceAndScoreBreakdown` | Query AI staffing assistant for recommendations. | AI output contains verified evidence and score breakdowns. | **PASS** |
| **TC-06-10** | `TC_06_10_missingSkillData_isDisclosedNotFabricated` | Query AI for employee without required skill. | Gaps disclosed explicitly; no hallucinations. | **PASS** |
| **TC-06-11** | `TC_06_11_concurrentConflictingAllocation_onlyOnePersists` | Concurrent competing requests for remaining capacity. | Exactly one request succeeds; total allocation <= 100%. | **PASS** |
| **TC-06-12** | `TC_06_12_cancelAllocation_capacityReleasedHistoryRetained` | Cancel confirmed allocation. | Status is `CANCELLED`, capacity released, record preserved. | **PASS** |

---

## 3. Test Execution Commands

### Execute Entire Test Suite:
```powershell
cd "C:\Users\ABHINAYA BEDGUM\Documents\assignment6"
& "C:\Users\ABHINAYA BEDGUM\Documents\maven\apache-maven-3.9.9\bin\mvn.cmd" test
```

### Execute Specific Test Class:
```powershell
& "C:\Users\ABHINAYA BEDGUM\Documents\maven\apache-maven-3.9.9\bin\mvn.cmd" test -Dtest=TalentAllocationIntegrationTest
```
