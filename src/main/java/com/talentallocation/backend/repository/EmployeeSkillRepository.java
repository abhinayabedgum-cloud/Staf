package com.talentallocation.backend.repository;

import com.talentallocation.backend.model.EmployeeSkill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeSkillRepository extends JpaRepository<EmployeeSkill, Long> {

    List<EmployeeSkill> findByEmployeeId(Long employeeId);

    List<EmployeeSkill> findBySkillId(Long skillId);

    Optional<EmployeeSkill> findByEmployeeIdAndSkillId(Long employeeId, Long skillId);

    boolean existsByEmployeeIdAndSkillId(Long employeeId, Long skillId);

    /**
     * Find all employee-skill pairs grouped by skill category.
     * Used for skill gap reporting.
     */
    @Query("""
        SELECT es FROM EmployeeSkill es
        JOIN FETCH es.skill s
        JOIN FETCH es.employee e
        WHERE s.category = :category
        ORDER BY es.proficiencyLevel DESC
    """)
    List<EmployeeSkill> findBySkillCategory(@Param("category") String category);

    /**
     * SQL Task: Resources grouped by skill and proficiency.
     */
    @Query("""
        SELECT es FROM EmployeeSkill es
        JOIN FETCH es.skill s
        JOIN FETCH es.employee e
        WHERE s.id = :skillId
        ORDER BY es.proficiencyLevel DESC
    """)
    List<EmployeeSkill> findBySkillIdOrderByProficiency(@Param("skillId") Long skillId);
}
