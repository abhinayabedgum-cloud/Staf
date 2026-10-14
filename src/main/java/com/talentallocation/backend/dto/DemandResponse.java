package com.talentallocation.backend.dto;

import com.talentallocation.backend.model.ProjectDemand;
import lombok.Data;
import java.time.LocalDate;
import java.util.List;

/** DTO for ProjectDemand response */
@Data
public class DemandResponse {
    private Long id;
    private String projectName;
    private String role;
    private List<SkillInfo> requiredSkills;
    private LocalDate startDate;
    private LocalDate endDate;
    private String location;
    private Integer allocationPercent;
    private ProjectDemand.Priority priority;
    private ProjectDemand.DemandStatus status;
    private String description;

    @Data
    public static class SkillInfo {
        private Long id;
        private String name;
        private String category;
    }
}
