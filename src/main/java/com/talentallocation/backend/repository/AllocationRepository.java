package com.talentallocation.backend.repository;

import com.talentallocation.backend.model.Allocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface AllocationRepository extends JpaRepository<Allocation, Long> {

    List<Allocation> findByEmployeeId(Long employeeId);

    List<Allocation> findByDemandId(Long demandId);

    List<Allocation> findByStatus(Allocation.AllocationStatus status);

    /**
     * Find active (non-cancelled, non-completed) allocations for an employee
     * that overlap with the given date range.
     * Used for conflict detection (TC-06-05, TC-06-11).
     */
    @Query("""
        SELECT a FROM Allocation a
        WHERE a.employee.id = :employeeId
        AND a.status NOT IN ('CANCELLED', 'COMPLETED')
        AND a.startDate <= :endDate
        AND a.endDate >= :startDate
    """)
    List<Allocation> findConflictingAllocations(
        @Param("employeeId") Long employeeId,
        @Param("startDate") LocalDate startDate,
        @Param("endDate") LocalDate endDate
    );

    /**
     * Find conflicting allocations EXCLUDING a specific allocation id.
     * Used for revalidation at confirm time.
     */
    @Query("""
        SELECT a FROM Allocation a
        WHERE a.employee.id = :employeeId
        AND a.id != :excludeId
        AND a.status NOT IN ('CANCELLED', 'COMPLETED')
        AND a.startDate <= :endDate
        AND a.endDate >= :startDate
    """)
    List<Allocation> findConflictingAllocationsExcluding(
        @Param("employeeId") Long employeeId,
        @Param("startDate") LocalDate startDate,
        @Param("endDate") LocalDate endDate,
        @Param("excludeId") Long excludeId
    );

    /**
     * Calculate total allocated percentage for an employee in a date range.
     * Used to enforce the capacity limit.
     */
    @Query("""
        SELECT COALESCE(SUM(a.allocationPercent), 0) FROM Allocation a
        WHERE a.employee.id = :employeeId
        AND a.status NOT IN ('CANCELLED', 'COMPLETED')
        AND a.startDate <= :endDate
        AND a.endDate >= :startDate
    """)
    Integer sumAllocatedPercentInRange(
        @Param("employeeId") Long employeeId,
        @Param("startDate") LocalDate startDate,
        @Param("endDate") LocalDate endDate
    );

    /**
     * SQL Task: Utilization by employee and department.
     */
    @Query("""
        SELECT a FROM Allocation a
        JOIN FETCH a.employee e
        JOIN FETCH a.demand d
        WHERE a.status NOT IN ('CANCELLED')
        AND a.startDate <= :endDate
        AND a.endDate >= :startDate
        ORDER BY e.department, e.name
    """)
    List<Allocation> findUtilizationInRange(
        @Param("startDate") LocalDate startDate,
        @Param("endDate") LocalDate endDate
    );

    /**
     * SQL Task: Available resources for a date range.
     * Returns employees with their total allocated % so caller can filter by availability.
     */
    @Query(value = """
        SELECT e.id, e.name, e.location, e.department,
               COALESCE(SUM(a.allocation_percent), 0) as allocated_percent
        FROM employees e
        LEFT JOIN allocations a ON a.employee_id = e.id
            AND a.status NOT IN ('CANCELLED', 'COMPLETED')
            AND a.start_date <= :endDate
            AND a.end_date >= :startDate
        WHERE e.employment_status = 'ACTIVE'
        GROUP BY e.id, e.name, e.location, e.department
        HAVING COALESCE(SUM(a.allocation_percent), 0) < :maxAllocation
        ORDER BY allocated_percent ASC
    """, nativeQuery = true)
    List<Object[]> findAvailableResourcesRaw(
        @Param("startDate") LocalDate startDate,
        @Param("endDate") LocalDate endDate,
        @Param("maxAllocation") int maxAllocation
    );
}
