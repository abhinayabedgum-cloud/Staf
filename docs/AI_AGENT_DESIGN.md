# AI Agent Design: Evidence-Grounded Staffing Assistant

## 1. System Mission & Core Guardrails
The **AI Staffing Assistant** is an evidence-grounded decision support agent designed to assist resource managers in identifying optimal talent for project demands.

### Strict Governance Rules:
1. **No Autonomous Allocations**: The AI can never create, approve, or cancel allocations.
2. **Deterministic Grounding**: Every candidate, score, and skill mentioned must be fetched directly from backend services via controlled tool calls.
3. **No Hallucination Policy**: If an employee lacks evidence or experience records, the AI must disclose the missing data rather than inventing credentials.
4. **Dual Mode Architecture**:
   - **Live AI Mode**: Uses an external LLM via structured JSON tool calling.
   - **Simulated AI Mode**: Operates deterministically using stored application state when no external model API key is provided.

---

## 2. Controlled Tool Specifications

```
+------------------------------------------------------------------------+
|                          AI AGENT CONTROLLER                           |
+-----------------------------------+------------------------------------+
                                    | Dispatches tool calls
                                    v
+------------------------------------------------------------------------+
|                            CONTROLLED TOOLS                            |
| 1. getDemandDetails(demandId)                                          |
| 2. searchEligibleCandidates(demandId)                                  |
| 3. getCandidateEvidence(employeeId, demandId)                          |
| 4. getAvailability(employeeId, startDate, endDate)                     |
| 5. getSkillGaps(employeeId, demandId)                                 |
| 6. suggestLearningPath(employeeId, skillId)                            |
+-----------------------------------+------------------------------------+
                                    | Executes read-only queries
                                    v
+------------------------------------------------------------------------+
|                       CORE APPLICATION SERVICES                        |
|   DemandService | ResourceMatchingService | AllocationService          |
+------------------------------------------------------------------------+
```

### Tool Definitions:
- `getDemandDetails(demandId)`: Returns project name, role, required skills, dates, and allocation %.
- `searchEligibleCandidates(demandId)`: Invokes deterministic matching engine and returns ranked candidate list.
- `getCandidateEvidence(employeeId, demandId)`: Returns certification and project evidence stored in `employee_skills`.
- `getAvailability(employeeId, startDate, endDate)`: Calculates free capacity % over the demand's duration.
- `getSkillGaps(employeeId, demandId)`: Identifies mandatory skills missing or below minimum proficiency.
- `suggestLearningPath(employeeId, skillId)`: Returns structured learning recommendations for addressing skill gaps.

---

## 3. Tool Execution Trace & Explainability
Every AI response returns:
1. Natural language synthesis explaining candidate suitability.
2. Structured array of executed tool calls (`toolCalls`), showing exact inputs and results.
3. Explicit disclosure of limitations (`limitations`), ensuring transparency during code walkthroughs.
