package com.talentallocation.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;

/**
 * Junction entity linking an Employee to a Skill with proficiency details.
 * ProficiencyLevel: 1=Beginner, 2=Intermediate, 3=Advanced, 4=Expert, 5=Master
 */
@Entity
@Table(name = "employee_skills",
    uniqueConstraints = {
        @UniqueConstraint(name = "uk_employee_skill", columnNames = {"employee_id", "skill_id"})
    },
    indexes = {
        @Index(name = "idx_es_employee", columnList = "employee_id"),
        @Index(name = "idx_es_skill", columnList = "skill_id"),
        @Index(name = "idx_es_proficiency", columnList = "proficiencyLevel")
    }
)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeSkill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "skill_id", nullable = false)
    private Skill skill;

    /**
     * Proficiency level: 1=Beginner, 2=Intermediate, 3=Advanced, 4=Expert, 5=Master
     */
    @Column(nullable = false)
    private Integer proficiencyLevel;

    /**
     * Date when the skill proficiency was last validated/certified.
     */
    @Column
    private LocalDate lastValidatedAt;

    /**
     * Evidence or certification reference.
     */
    @Column(length = 500)
    private String evidence;
}
