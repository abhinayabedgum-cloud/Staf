package com.talentallocation.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.List;

/**
 * Represents a skill available in the system.
 * E.g., "Java", "Project Management", "Cloud Architecture"
 */
@Entity
@Table(name = "skills",
    indexes = {
        @Index(name = "idx_skill_name", columnList = "name", unique = true),
        @Index(name = "idx_skill_category", columnList = "category")
    }
)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String name;

    @Column(nullable = false, length = 100)
    private String category;

    @Column(length = 500)
    private String description;

    @OneToMany(mappedBy = "skill", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<EmployeeSkill> employeeSkills;
}
