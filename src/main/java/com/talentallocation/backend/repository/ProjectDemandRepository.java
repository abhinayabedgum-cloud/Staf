package com.talentallocation.backend.repository;

import com.talentallocation.backend.model.ProjectDemand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface ProjectDemandRepository extends JpaRepository<ProjectDemand, Long> {

    List<ProjectDemand> findByStatus(ProjectDemand.DemandStatus status);

    List<ProjectDemand> findByStatusAndPriority(
        ProjectDemand.DemandStatus status, ProjectDemand.Priority priority
    );

    /**
     * SQL Task: Open demands by role and priority.
     */
    @Query("""
        SELECT d FROM ProjectDemand d
        WHERE d.status = 'OPEN'
        AND (:role IS NULL OR LOWER(d.role) LIKE LOWER(CONCAT('%', :role, '%')))
        ORDER BY d.priority DESC, d.startDate ASC
    """)
    List<ProjectDemand> findOpenDemandsByRole(@Param("role") String role);

    /**
     * SQL Task: Demands with no eligible candidate.
     * Returns open demands that have no CONFIRMED/APPROVED allocation.
     */
    @Query("""
        SELECT d FROM ProjectDemand d
        WHERE d.status = 'OPEN'
        AND NOT EXISTS (
            SELECT a FROM Allocation a
            WHERE a.demand = d
            AND a.status IN ('CONFIRMED', 'APPROVED', 'PENDING')
        )
    """)
    List<ProjectDemand> findDemandsWithNoAllocation();

    /**
     * Find demands overlapping with a given date range and skill.
     */
    @Query("""
        SELECT d FROM ProjectDemand d
        WHERE d.status IN ('OPEN', 'IN_PROGRESS')
        AND d.startDate <= :endDate
        AND d.endDate >= :startDate
    """)
    List<ProjectDemand> findDemandsInDateRange(
        @Param("startDate") LocalDate startDate,
        @Param("endDate") LocalDate endDate
    );

    /**
     * Find demands requiring a specific skill.
     */
    @Query("""
        SELECT d FROM ProjectDemand d
        WHERE d.status IN ('OPEN', 'IN_PROGRESS')
        AND d.requiredSkillIds LIKE CONCAT('%', :skillId, '%')
    """)
    List<ProjectDemand> findDemandsRequiringSkill(@Param("skillId") String skillId);
}
