package com.talentallocation.backend.service;

import com.talentallocation.backend.dto.CandidateRecommendation;
import com.talentallocation.backend.model.*;
import com.talentallocation.backend.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Resource Matching Service - scores and ranks candidates for a demand.
 *
 * Scoring Algorithm (all based on STORED data only):
 *   - Skill Score (0–50): Sum of proficiency levels for matched skills / total required * 50
 *   - Availability Score (0–30): Available % / required % * 30
 *   - Location Score (0–10): 10 if location matches, 0 if not or not specified
 *   - Validation Score (0–10): % of skills validated within last 2 years * 10
 *
 * TC-06-03: Results follow documented eligibility and ranking criteria.
 * TC-06-04: Candidate lacking mandatory skill → flagged/excluded.
 * TC-06-09: AI recommendation includes evidence and score breakdown.
 * TC-06-10: Missing data disclosed, not fabricated.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class ResourceMatchingService {

    private final EmployeeRepository employeeRepository;
    private final EmployeeSkillRepository employeeSkillRepository;
    private final AllocationRepository allocationRepository;
    private final SkillRepository skillRepository;
    private final DemandService demandService;

    @Value("${app.capacity.max-allocation-percent:100}")
    private int maxAllocationPercent;

    @Transactional(readOnly = true)
    public List<CandidateRecommendation> findCandidatesForDemand(Long demandId) {
        ProjectDemand demand = demandService.findDemandById(demandId);
        List<Long> requiredSkillIds = demandService.parseRequiredSkillIds(demand);

        // Get all ACTIVE employees
        List<Employee> activeEmployees = employeeRepository.findByEmploymentStatus(
            Employee.EmploymentStatus.ACTIVE);

        List<CandidateRecommendation> recommendations = new ArrayList<>();
        for (Employee employee : activeEmployees) {
            CandidateRecommendation rec = scoreCandidate(employee, demand, requiredSkillIds);
            recommendations.add(rec);
        }

        // Sort by total score descending
        recommendations.sort(Comparator.comparingDouble(CandidateRecommendation::getTotalScore).reversed());
        log.info("Generated {} recommendations for demand {}", recommendations.size(), demandId);
        return recommendations;
    }

    /**
     * Score a single candidate against a demand.
     * All data comes from stored records — never fabricated (TC-06-10).
     */
    private CandidateRecommendation scoreCandidate(Employee employee, ProjectDemand demand,
                                                     List<Long> requiredSkillIds) {
        CandidateRecommendation rec = new CandidateRecommendation();
        rec.setEmployeeId(employee.getId());
        rec.setEmployeeCode(employee.getEmployeeCode());
        rec.setEmployeeName(employee.getName());
        rec.setLocation(employee.getLocation());
        rec.setDepartment(employee.getDepartment());

        // Get employee's skills from stored data
        List<EmployeeSkill> empSkills = employeeSkillRepository.findByEmployeeId(employee.getId());
        Map<Long, EmployeeSkill> skillMap = empSkills.stream()
            .collect(Collectors.toMap(es -> es.getSkill().getId(), es -> es));

        // Match skills
        List<CandidateRecommendation.MatchedSkill> matched = new ArrayList<>();
        List<CandidateRecommendation.MissingSkill> missing = new ArrayList<>();

        double skillScoreSum = 0;
        double validatedCount = 0;

        for (Long skillId : requiredSkillIds) {
            EmployeeSkill es = skillMap.get(skillId);
            Skill skill = skillRepository.findById(skillId).orElse(null);
            if (skill == null) continue;

            if (es != null) {
                // Candidate has this skill — add to matched
                CandidateRecommendation.MatchedSkill ms = new CandidateRecommendation.MatchedSkill();
                ms.setSkillName(es.getSkill().getName());
                ms.setCategory(es.getSkill().getCategory());
                ms.setProficiencyLevel(es.getProficiencyLevel());
                ms.setProficiencyLabel(EmployeeService.getProficiencyLabel(es.getProficiencyLevel()));
                ms.setLastValidatedAt(
                    es.getLastValidatedAt() != null ? es.getLastValidatedAt().toString() : "NOT VALIDATED");
                ms.setEvidence(es.getEvidence() != null ? es.getEvidence() : "No evidence recorded");
                matched.add(ms);
                skillScoreSum += es.getProficiencyLevel(); // max 5 per skill

                // Check validation recency (within 2 years)
                if (es.getLastValidatedAt() != null
                    && es.getLastValidatedAt().isAfter(LocalDate.now().minusYears(2))) {
                    validatedCount++;
                }
            } else {
                // Candidate is MISSING this skill — disclosed, not invented (TC-06-10)
                CandidateRecommendation.MissingSkill ms = new CandidateRecommendation.MissingSkill();
                ms.setSkillId(skillId);
                ms.setSkillName(skill.getName());
                ms.setCategory(skill.getCategory());
                ms.setTrainingRecommendation(
                    "Recommend enrolling in a " + skill.getCategory() + " course for " + skill.getName());
                missing.add(ms);
            }
        }

        rec.setMatchedSkills(matched);
        rec.setMissingSkills(missing);

        // TC-06-04: Check mandatory skill requirement
        boolean meetsSkills = missing.isEmpty();
        rec.setMeetsSkillRequirements(meetsSkills);

        // Availability check (from stored allocations)
        Integer allocatedPercent = allocationRepository.sumAllocatedPercentInRange(
            employee.getId(), demand.getStartDate(), demand.getEndDate());
        if (allocatedPercent == null) allocatedPercent = 0;
        int available = Math.max(0, maxAllocationPercent - allocatedPercent);
        rec.setAvailablePercent(available);
        boolean meetsAvailability = available >= demand.getAllocationPercent();
        rec.setMeetsAvailabilityRequirement(meetsAvailability);

        // Location check
        boolean locationMatch = demand.getLocation() == null
            || demand.getLocation().isBlank()
            || (employee.getLocation() != null
                && employee.getLocation().equalsIgnoreCase(demand.getLocation()));
        rec.setLocationMatch(locationMatch);

        // ===== SCORE CALCULATION (deterministic, stored data only) =====
        CandidateRecommendation.ScoreBreakdown breakdown = new CandidateRecommendation.ScoreBreakdown();

        // Skill score: 0–50
        double maxPossibleSkillScore = requiredSkillIds.isEmpty() ? 1 : requiredSkillIds.size() * 5.0;
        double skillScore = requiredSkillIds.isEmpty() ? 50.0
            : (skillScoreSum / maxPossibleSkillScore) * 50.0;
        breakdown.setSkillScore(Math.round(skillScore * 100.0) / 100.0);

        // Availability score: 0–30
        double availScore = demand.getAllocationPercent() == 0 ? 30.0
            : (Math.min(available, demand.getAllocationPercent()) / (double) demand.getAllocationPercent()) * 30.0;
        breakdown.setAvailabilityScore(Math.round(availScore * 100.0) / 100.0);

        // Location score: 0–10
        breakdown.setLocationScore(locationMatch ? 10.0 : 0.0);

        // Validation score: 0–10
        double valScore = matched.isEmpty() ? 0.0
            : (validatedCount / matched.size()) * 10.0;
        breakdown.setValidationScore(Math.round(valScore * 100.0) / 100.0);

        double total = breakdown.getSkillScore() + breakdown.getAvailabilityScore()
            + breakdown.getLocationScore() + breakdown.getValidationScore();
        rec.setTotalScore(Math.round(total * 100.0) / 100.0);
        rec.setScoreBreakdown(breakdown);

        // Human-readable explanation
        rec.setExplanation(buildExplanation(rec, demand, matched, missing, available));
        return rec;
    }

    private String buildExplanation(CandidateRecommendation rec, ProjectDemand demand,
                                     List<CandidateRecommendation.MatchedSkill> matched,
                                     List<CandidateRecommendation.MissingSkill> missing,
                                     int available) {
        StringBuilder sb = new StringBuilder();
        sb.append(String.format("Candidate %s scored %.1f/100 for role '%s'. ",
            rec.getEmployeeName(), rec.getTotalScore(), demand.getRole()));

        if (!matched.isEmpty()) {
            sb.append("Matching skills: ");
            matched.forEach(m -> sb.append(m.getSkillName())
                .append(" (").append(m.getProficiencyLabel()).append("), "));
            sb.delete(sb.length() - 2, sb.length()).append(". ");
        }
        if (!missing.isEmpty()) {
            sb.append("Missing skills: ");
            missing.forEach(m -> sb.append(m.getSkillName()).append(", "));
            sb.delete(sb.length() - 2, sb.length()).append(". ");
        }
        sb.append(String.format("Available capacity: %d%% (requires %d%%). ",
            available, demand.getAllocationPercent()));
        sb.append(rec.getLocationMatch() ? "Location matches. " : "Location does not match. ");

        if (!rec.getMeetsSkillRequirements()) {
            sb.append("[WARNING] Candidate does not meet all skill requirements. ");
        }
        if (!rec.getMeetsAvailabilityRequirement()) {
            sb.append("[WARNING] Candidate has insufficient availability. ");
        }
        return sb.toString();
    }
}
