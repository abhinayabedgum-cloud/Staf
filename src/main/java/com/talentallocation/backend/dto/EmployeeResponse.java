package com.talentallocation.backend.dto;

import com.talentallocation.backend.model.Employee;
import lombok.Data;
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
    private List<SkillResponse> skills;

    @Data
    public static class SkillResponse {
        private Long id;
        private String skillName;
        private String category;
        private Integer proficiencyLevel;
        private String proficiencyLabel;
        private String lastValidatedAt;
        private String evidence;
    }
}
