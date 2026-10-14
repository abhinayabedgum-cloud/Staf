package com.talentallocation.backend.dto;

import lombok.Data;
import java.util.List;

/**
 * DTO representing a candidate recommendation from the AI staffing agent.
 * Contains score breakdown and evidence-based explanation.
 */
@Data
public class CandidateRecommendation {

    private Long employeeId;
    private String employeeCode;
    private String employeeName;
    private String location;
    private String department;

    /** Total score out of 100, computed deterministically from stored data */
    private Double totalScore;

    /** Breakdown of score components */
    private ScoreBreakdown scoreBreakdown;

    /** Skills this candidate has that match the demand */
    private List<MatchedSkill> matchedSkills;

    /** Skills required by the demand that the candidate is missing */
    private List<MissingSkill> missingSkills;

    /** Available percentage in the requested date range */
    private Integer availablePercent;

    /** Whether the candidate meets the mandatory skill threshold */
    private Boolean meetsSkillRequirements;

    /** Whether the candidate has sufficient availability */
    private Boolean meetsAvailabilityRequirement;

    /** Whether the candidate location matches */
    private Boolean locationMatch;

    /** Human-readable explanation of the recommendation */
    private String explanation;

    @Data
    public static class ScoreBreakdown {
        private Double skillScore;          // 0-50 based on proficiency
        private Double availabilityScore;   // 0-30 based on availability
        private Double locationScore;       // 0-10 based on location match
        private Double validationScore;     // 0-10 based on recently validated skills
    }

    @Data
    public static class MatchedSkill {
        private String skillName;
        private String category;
        private Integer proficiencyLevel;
        private String proficiencyLabel;
        private String lastValidatedAt;
        private String evidence;
    }

    @Data
    public static class MissingSkill {
        private Long skillId;
        private String skillName;
        private String category;
        private String trainingRecommendation;
    }
}
