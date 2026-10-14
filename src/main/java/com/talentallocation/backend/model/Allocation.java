package com.talentallocation.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Represents an allocation of an employee to a project demand.
 * Business Rules:
 *  - An employee cannot be allocated more than the configured capacity limit.
 *  - Overlapping allocations must be detected using date ranges + allocationPercent.
 *  - Allocation confirmation requires authorized approval (approvedBy must not be null).
 *  - History is retained when cancelled; capacity is recalculated.
 */
@Entity
@Table(name = "allocations",
    indexes = {
        @Index(name = "idx_alloc_employee", columnList = "employee_id"),
        @Index(name = "idx_alloc_demand", columnList = "demand_id"),
        @Index(name = "idx_alloc_dates", columnList = "startDate,endDate"),
        @Index(name = "idx_alloc_status", columnList = "status")
    }
)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Allocation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "demand_id", nullable = false)
    private ProjectDemand demand;

    @Column(nullable = false)
    private LocalDate startDate;

    @Column(nullable = false)
    private LocalDate endDate;

    /**
     * Allocation percentage for this record (e.g., 50 means 50% of capacity).
     */
    @Column(nullable = false)
    private Integer allocationPercent;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private AllocationStatus status;

    /**
     * Who approved this allocation (required before CONFIRMED status).
     */
    @Column(length = 100)
    private String approvedBy;

    /**
     * When the allocation was approved.
     */
    @Column
    private LocalDateTime approvedAt;

    /**
     * Reason for cancellation, if cancelled.
     */
    @Column(length = 500)
    private String cancellationReason;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (status == null) {
            status = AllocationStatus.PENDING;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public enum AllocationStatus {
        PENDING,      // Created, awaiting approval
        APPROVED,     // Approved but not yet started
        CONFIRMED,    // Active confirmed allocation
        CANCELLED,    // Cancelled (history retained)
        COMPLETED     // End date has passed
    }
}
