package com.talentallocation.backend.repository;

import com.talentallocation.backend.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    Optional<Employee> findByEmployeeCode(String employeeCode);

    List<Employee> findByEmploymentStatus(Employee.EmploymentStatus status);

    List<Employee> findByLocation(String location);

    /**
     * Find all ACTIVE employees who have a specific skill at or above minimum proficiency.
     */
    @Query("""
        SELECT DISTINCT e FROM Employee e
        JOIN e.skills es
        JOIN es.skill s
        WHERE e.employmentStatus = 'ACTIVE'
        AND s.id = :skillId
        AND es.proficiencyLevel >= :minProficiency
    """)
    List<Employee> findActiveEmployeesWithSkill(
        @Param("skillId") Long skillId,
        @Param("minProficiency") int minProficiency
    );

    /**
     * Find ACTIVE employees by location.
     */
    List<Employee> findByEmploymentStatusAndLocation(
        Employee.EmploymentStatus status, String location
    );

    boolean existsByEmployeeCode(String employeeCode);
}
