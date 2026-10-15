package com.talentallocation.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;
import java.util.List;

/**
 * Represents an employee in the system.
 * Stores personal details, workforce profile, employment status, skills, and certifications.
 */
@Entity
@Table(name = "employees",
    indexes = {
        @Index(name = "idx_employee_code", columnList = "employeeCode", unique = true),
        @Index(name = "idx_employee_location", columnList = "location"),
        @Index(name = "idx_employee_status", columnList = "employmentStatus")
    }
)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 20)
    private String employeeCode;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(length = 100)
    private String location;

    @Column(nullable = false, length = 30)
    @Enumerated(EnumType.STRING)
    private EmploymentStatus employmentStatus;

    @Column(length = 100)
    private String department;

    @Column(length = 100)
    private String email;

    @Column(name = "job_role", length = 100)
    private String currentRole;

    @Column
    private Integer yearsOfExperience;

    // Current Project details (Section 4)
    @Column(length = 150)
    private String currentProject;

    @Column(length = 100)
    private String projectRole;

    @Column
    private LocalDate projectStartDate;

    @Column
    private LocalDate projectEndDate;

    @Column
    private Integer projectCompletionPercent;

    // Availability details (Section 5)
    @Column(length = 50)
    @Enumerated(EnumType.STRING)
    private AvailabilityStatus availabilityStatus;

    @Column
    private LocalDate expectedAvailabilityDate;

    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<EmployeeSkill> skills;

    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Certification> certifications;

    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Allocation> allocations;

    public enum EmploymentStatus {
        ACTIVE, INACTIVE, ON_LEAVE, TERMINATED
    }

    public enum AvailabilityStatus {
        FULLY_ALLOCATED,
        PARTIALLY_AVAILABLE,
        AVAILABLE_FOR_NEW_PROJECT
    }
}
