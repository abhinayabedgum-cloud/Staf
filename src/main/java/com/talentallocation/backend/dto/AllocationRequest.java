package com.talentallocation.backend.dto;

import jakarta.validation.constraints.*;
import lombok.Data;
import java.time.LocalDate;

/** DTO for creating an Allocation */
@Data
public class AllocationRequest {

    @NotNull(message = "Employee ID is required")
    private Long employeeId;

    @NotNull(message = "Demand ID is required")
    private Long demandId;

    @NotNull(message = "Start date is required")
    private LocalDate startDate;

    @NotNull(message = "End date is required")
    private LocalDate endDate;

    @NotNull(message = "Allocation percent is required")
    @Min(value = 1, message = "Allocation percent must be at least 1")
    @Max(value = 100, message = "Allocation percent cannot exceed 100")
    private Integer allocationPercent;

    /** The manager or HR person who approves this allocation */
    @NotBlank(message = "Approved by is required")
    private String approvedBy;
}
