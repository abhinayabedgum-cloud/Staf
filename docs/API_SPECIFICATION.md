# REST API Specification: AI-Driven Talent and Resource Allocation Marketplace

## 1. Global API Standards
- **Base URL**: `http://localhost:8080/api`
- **Content Type**: `application/json`
- **Standard Error Format**:
```json
{
  "timestamp": "2026-10-14T15:00:00Z",
  "status": 400,
  "error": "Bad Request",
  "message": "Allocation percentage cannot exceed available capacity",
  "path": "/api/allocations"
}
```

---

## 2. API Endpoints Catalog

### 2.1 Employees & Skills
#### `POST /api/employees`
Creates a new synthetic employee record.
- **Request**:
```json
{
  "employeeCode": "EMP010",
  "name": "Sarah Connor",
  "email": "sarah@example.com",
  "department": "Engineering",
  "role": "Fullstack Engineer",
  "location": "New York",
  "employmentStatus": "ACTIVE",
  "maxAllocationPercent": 100
}
```
- **Response**: `201 Created` with full employee JSON object.

#### `GET /api/employees`
Retrieves all employees with embedded verified skills.
- **Response**: `200 OK` — `Array<EmployeeResponse>`

#### `POST /api/employees/{id}/skills`
Maps a verified skill to an employee.
- **Request**:
```json
{
  "skillId": 1,
  "proficiencyLevel": 4,
  "lastValidatedAt": "2024-03-15",
  "evidence": "Oracle Certified Java Professional"
}
```
- **Response**: `200 OK`

---

### 2.2 Project Demands
#### `POST /api/demands`
Creates a new project staffing demand.
- **Request**:
```json
{
  "projectName": "Cloud Migration Alpha",
  "role": "Cloud Architect",
  "description": "Enterprise AWS migration",
  "location": "New York",
  "startDate": "2026-11-01",
  "endDate": "2027-02-28",
  "allocationPercent": 100,
  "priority": "HIGH",
  "requiredSkillId": 7,
  "minProficiency": 3
}
```
- **Response**: `201 Created`

#### `POST /api/demands/{id}/recommendations`
Runs deterministic candidate ranking engine for demand `{id}`.
- **Response**: `200 OK`
```json
[
  {
    "employeeId": 1,
    "employeeName": "Alice Johnson",
    "employeeCode": "EMP001",
    "department": "Engineering",
    "location": "New York",
    "totalScore": 92.5,
    "scoreBreakdown": {
      "skillScore": 50.0,
      "availabilityScore": 25.0,
      "locationScore": 10.0,
      "experienceScore": 7.5
    },
    "availablePercent": 100,
    "meetsSkillRequirements": true,
    "meetsAvailabilityRequirement": true,
    "matchedSkills": [
      { "skillName": "Java", "proficiencyLevel": 5, "proficiencyLabel": "Master" }
    ],
    "missingSkills": []
  }
]
```

---

### 2.3 Allocations Workflow
#### `POST /api/allocations`
Confirms an allocation with mandatory approver identity.
- **Request**:
```json
{
  "employeeId": 1,
  "demandId": 5,
  "startDate": "2026-11-01",
  "endDate": "2027-02-28",
  "allocationPercent": 100,
  "approvedBy": "HR Director"
}
```
- **Response**: `201 Created`
- **Error (Over-allocation)**: `400 Bad Request` ("Allocation percentage exceeds available capacity on overlapping dates").

#### `PUT /api/allocations/{id}/cancel`
Releases allocation capacity while preserving history.
- **Request**:
```json
{
  "reason": "Project scope changed by client"
}
```
- **Response**: `200 OK`

---

### 2.4 AI Staffing Assistant
#### `POST /api/ai/staffing-advice`
Executes tool-augmented staffing recommendation pipeline.
- **Request**:
```json
{
  "demandId": 1,
  "question": "Who is the top candidate for this project and why?"
}
```
- **Response**: `200 OK`
```json
{
  "response": "Based on verified backend records, Alice Johnson (EMP001) is the top-ranked candidate...",
  "toolCalls": [
    {
      "toolName": "getDemandDetails",
      "inputs": { "demandId": 1 },
      "result": "Payment Gateway Modernization (Role: Java Lead)",
      "success": true
    },
    {
      "toolName": "searchEligibleCandidates",
      "inputs": { "demandId": 1 },
      "result": "Found 4 matching candidates",
      "success": true
    }
  ],
  "limitations": [
    "AI operates in SIMULATED DETERMINISTIC MODE.",
    "Scores are computed from stored records only.",
    "AI cannot approve allocations autonomously."
  ]
}
```
