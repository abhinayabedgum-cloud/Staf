package com.talentallocation.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.List;

/**
 * Represents an employee in the system.
 * Stores personal details and employment status.
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

    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<EmployeeSkill> skills;

    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Allocation> allocations;

    public enum EmploymentStatus {
        ACTIVE, INACTIVE, ON_LEAVE, TERMINATED
    }
}
