package com.talentallocation.backend.dto;

import com.talentallocation.backend.model.ProjectDemand;
import jakarta.validation.constraints.*;
import lombok.Data;
import java.time.LocalDate;
import java.util.List;

/** DTO for creating a ProjectDemand */
@Data
public class DemandRequest {

    @NotBlank(message = "Project name is required")
    private String projectName;

    @NotBlank(message = "Role is required")
    private String role;

    private List<Long> requiredSkillIds;

    @NotNull(message = "Start date is required")
    private LocalDate startDate;

    @NotNull(message = "End date is required")
    private LocalDate endDate;

    private String location;

    @NotNull(message = "Allocation percent is required")
    @Min(value = 1, message = "Allocation percent must be at least 1")
    @Max(value = 100, message = "Allocation percent cannot exceed 100")
    private Integer allocationPercent;

    @NotNull(message = "Priority is required")
    private ProjectDemand.Priority priority;

    private String description;
}
