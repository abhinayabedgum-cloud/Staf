package com.talentallocation.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;
import java.util.List;

/**
 * Represents a project demand for a specific role and skill set.
 * A demand defines WHAT is needed; allocations define WHO fills it.
 */
@Entity
@Table(name = "project_demands",
    indexes = {
        @Index(name = "idx_demand_status", columnList = "status"),
        @Index(name = "idx_demand_dates", columnList = "startDate,endDate"),
        @Index(name = "idx_demand_location", columnList = "location"),
        @Index(name = "idx_demand_priority", columnList = "priority")
    }
)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectDemand {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String projectName;

    @Column(nullable = false, length = 100)
    private String role;

    /** Comma-separated list of required skill IDs */
    @Column(length = 1000)
    private String requiredSkillIds;

    @Column(nullable = false)
    private LocalDate startDate;

    @Column(nullable = false)
    private LocalDate endDate;

    @Column(length = 100)
    private String location;

    /**
     * Allocation percentage required (1–100).
     */
    @Column(nullable = false)
    private Integer allocationPercent;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Priority priority;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private DemandStatus status;

    @Column(length = 1000)
    private String description;

    @OneToMany(mappedBy = "demand", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Allocation> allocations;

    public enum Priority {
        LOW, MEDIUM, HIGH, CRITICAL
    }

    public enum DemandStatus {
        OPEN, IN_PROGRESS, FULFILLED, CANCELLED, ON_HOLD
    }
}
