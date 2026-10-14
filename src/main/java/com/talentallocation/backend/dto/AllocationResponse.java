package com.talentallocation.backend.dto;

import com.talentallocation.backend.model.Allocation;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;

/** DTO for Allocation response */
@Data
public class AllocationResponse {
    private Long id;
    private Long employeeId;
    private String employeeName;
    private String employeeCode;
    private Long demandId;
    private String projectName;
    private String role;
    private LocalDate startDate;
    private LocalDate endDate;
    private Integer allocationPercent;
    private Allocation.AllocationStatus status;
    private String approvedBy;
    private LocalDateTime approvedAt;
    private LocalDateTime createdAt;
}
