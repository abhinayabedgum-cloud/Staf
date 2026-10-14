package com.talentallocation.backend.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

/** DTO for adding a skill to an employee */
@Data
public class EmployeeSkillRequest {
    @NotNull(message = "Skill ID is required")
    private Long skillId;

    @NotNull(message = "Proficiency level is required")
    @Min(value = 1, message = "Proficiency level must be between 1 and 5")
    @Max(value = 5, message = "Proficiency level must be between 1 and 5")
    private Integer proficiencyLevel;

    /** ISO date string, e.g. 2024-01-15 */
    private String lastValidatedAt;

    private String evidence;
}
