package com.talentallocation.backend.dto;

import com.talentallocation.backend.model.Employee;
import jakarta.validation.constraints.*;
import lombok.Data;
import java.time.LocalDate;
import java.util.List;

/**
 * DTO for updating workforce profile via Employee Self-Service.
 */
@Data
public class EmployeeSelfServiceRequest {

    // Section 1 - Employee Information
    @NotBlank(message = "Current role is required")
    private String currentRole;

    @NotNull(message = "Years of experience is required")
    @Min(value = 0, message = "Years of experience cannot be negative")
    @Max(value = 50, message = "Years of experience must be realistic (max 50)")
    private Integer yearsOfExperience;

    private String location;

    private String department;

    @Email(message = "Invalid email format")
    private String email;

    // Section 2 - Skills & Proficiency
    private List<SkillItem> skills;

    // Section 3 - Certifications
    private List<CertificationItem> certifications;

    // Section 4 - Current Project
    private String currentProject;

    private String projectRole;

    private LocalDate projectStartDate;

    private LocalDate projectEndDate;

    @Min(value = 0, message = "Completion percentage cannot be less than 0")
    @Max(value = 100, message = "Completion percentage cannot exceed 100")
    private Integer projectCompletionPercent;

    // Section 5 - Availability
    private Employee.AvailabilityStatus availabilityStatus;

    private LocalDate expectedAvailabilityDate;

    @Data
    public static class SkillItem {
        @NotNull(message = "Skill ID is required")
        private Long skillId;

        @NotNull(message = "Proficiency level is required")
        @Min(value = 1, message = "Proficiency level minimum is 1")
        @Max(value = 5, message = "Proficiency level maximum is 5")
        private Integer proficiencyLevel;

        private String lastValidatedAt;

        private String evidence;
    }

    @Data
    public static class CertificationItem {
        private Long id;

        @NotBlank(message = "Certification name is required")
        private String name;

        private String issuingOrganization;

        private LocalDate issueDate;

        private LocalDate expiryDate;
    }
}
