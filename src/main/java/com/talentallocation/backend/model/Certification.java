package com.talentallocation.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;

/**
 * Represents a professional certification held by an employee.
 */
@Entity
@Table(name = "certifications", indexes = {
    @Index(name = "idx_cert_employee", columnList = "employee_id")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Certification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id", nullable = false)
    @JsonIgnore
    private Employee employee;

    @Column(nullable = false, length = 150)
    private String name;

    @Column(length = 150)
    private String issuingOrganization;

    @Column
    private LocalDate issueDate;

    @Column
    private LocalDate expiryDate;
}
