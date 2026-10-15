package com.talentallocation.backend.dto;

import com.talentallocation.backend.model.Employee;
import lombok.Data;
import java.time.LocalDate;
import java.util.List;

/** DTO for Employee response payload */
@Data
public class EmployeeResponse {
    private Long id;
    private String employeeCode;
    private String name;
    private String location;
    private Employee.EmploymentStatus employmentStatus;
    private String department;
    private String email;
    private String currentRole;
    private Integer yearsOfExperience;

    // Current Project
    private String currentProject;
    private String projectRole;
    private LocalDate projectStartDate;
    private LocalDate projectEndDate;
    private Integer projectCompletionPercent;

    // Availability
    private Employee.AvailabilityStatus availabilityStatus;
    private LocalDate expectedAvailabilityDate;

    // Skills & Certifications
    private List<SkillResponse> skills;
    private List<CertificationResponse> certifications;

    @Data
    public static class SkillResponse {
        private Long id;
        private Long skillId;
        private String skillName;
        private String category;
        private Integer proficiencyLevel;
        private String proficiencyLabel;
        private String lastValidatedAt;
        private String evidence;
    }

    @Data
    public static class CertificationResponse {
        private Long id;
        private String name;
        private String issuingOrganization;
        private LocalDate issueDate;
        private LocalDate expiryDate;
    }
}
