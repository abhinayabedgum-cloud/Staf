package com.talentallocation.backend.service;

import com.talentallocation.backend.dto.AllocationRequest;
import com.talentallocation.backend.dto.AllocationResponse;
import com.talentallocation.backend.exception.BusinessRuleException;
import com.talentallocation.backend.exception.ResourceNotFoundException;
import com.talentallocation.backend.model.*;
import com.talentallocation.backend.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Allocation Service - handles the allocation lifecycle.
 *
 * Business Rules enforced here:
 *  - TC-06-05: Detect overlapping full allocations (conflict detection).
 *  - TC-06-06: Report partial availability accurately.
 *  - TC-06-07: Confirm allocation after approval, persist and recalculate.
 *  - TC-06-08: Reject if over capacity.
 *  - TC-06-11: Use @Transactional + DB constraints to prevent concurrent conflicts.
 *  - TC-06-12: Cancel = set status CANCELLED, keep history, capacity recalculated.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class AllocationService {

    private final AllocationRepository allocationRepository;
    private final EmployeeRepository employeeRepository;
    private final ProjectDemandRepository demandRepository;

    @Value("${app.capacity.max-allocation-percent:100}")
    private int maxAllocationPercent;

    /**
     * Create and confirm an allocation in one step.
     * The approvedBy field is required — it acts as the approval gate.
     * Re-validates eligibility at commit time (TC-06-07).
     */
    @Transactional
    public AllocationResponse createAllocation(AllocationRequest request) {
        // Validate dates
        if (!request.getEndDate().isAfter(request.getStartDate())) {
            throw new BusinessRuleException("End date must be after start date.");
        }

        Employee employee = employeeRepository.findById(request.getEmployeeId())
            .orElseThrow(() -> new ResourceNotFoundException(
                "Employee not found: " + request.getEmployeeId()));

        if (employee.getEmploymentStatus() != Employee.EmploymentStatus.ACTIVE) {
            throw new BusinessRuleException(
                "Employee '" + employee.getName() + "' is not active and cannot be allocated.");
        }

        ProjectDemand demand = demandRepository.findById(request.getDemandId())
            .orElseThrow(() -> new ResourceNotFoundException(
                "Demand not found: " + request.getDemandId()));

        if (demand.getStatus() == ProjectDemand.DemandStatus.FULFILLED
            || demand.getStatus() == ProjectDemand.DemandStatus.CANCELLED) {
            throw new BusinessRuleException(
                "Demand is " + demand.getStatus() + " and cannot receive new allocations.");
        }

        // TC-06-08: Check capacity limit
        Integer currentlyAllocated = allocationRepository.sumAllocatedPercentInRange(
            employee.getId(), request.getStartDate(), request.getEndDate());
        if (currentlyAllocated == null) currentlyAllocated = 0;

        int newTotal = currentlyAllocated + request.getAllocationPercent();
        if (newTotal > maxAllocationPercent) {
            throw new BusinessRuleException(String.format(
                "Allocation rejected: employee '%s' already has %d%% allocated in this period. "
                + "Adding %d%% would exceed the %d%% capacity limit.",
                employee.getName(), currentlyAllocated,
                request.getAllocationPercent(), maxAllocationPercent));
        }

        // TC-06-05/TC-06-11: Check for full conflicts
        List<Allocation> conflicts = allocationRepository.findConflictingAllocations(
            employee.getId(), request.getStartDate(), request.getEndDate());
        if (!conflicts.isEmpty() && newTotal > maxAllocationPercent) {
            throw new BusinessRuleException(
                "Conflicting allocation detected for employee '" + employee.getName() + "'.");
        }

        Allocation allocation = new Allocation();
        allocation.setEmployee(employee);
        allocation.setDemand(demand);
        allocation.setStartDate(request.getStartDate());
        allocation.setEndDate(request.getEndDate());
        allocation.setAllocationPercent(request.getAllocationPercent());
        allocation.setStatus(Allocation.AllocationStatus.CONFIRMED);
        allocation.setApprovedBy(request.getApprovedBy());
        allocation.setApprovedAt(LocalDateTime.now());

        Allocation saved = allocationRepository.save(allocation);
        log.info("Confirmed allocation: Employee {} -> Demand {} ({}%)",
            employee.getName(), demand.getProjectName(), request.getAllocationPercent());
        return mapToResponse(saved);
    }

    /**
     * Cancel an allocation. History is retained; capacity is released.
     * TC-06-12: After cancellation, sumAllocatedPercentInRange will not count this record.
     */
    @Transactional
    public AllocationResponse cancelAllocation(Long id, String reason) {
        Allocation allocation = allocationRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Allocation not found: " + id));

        if (allocation.getStatus() == Allocation.AllocationStatus.CANCELLED) {
            throw new BusinessRuleException("Allocation is already cancelled.");
        }

        allocation.setStatus(Allocation.AllocationStatus.CANCELLED);
        allocation.setCancellationReason(reason);
        Allocation saved = allocationRepository.save(allocation);
        log.info("Cancelled allocation ID {} for employee {}",
            id, allocation.getEmployee().getName());
        return mapToResponse(saved);
    }

    @Transactional(readOnly = true)
    public AllocationResponse getAllocation(Long id) {
        return mapToResponse(allocationRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Allocation not found: " + id)));
    }

    @Transactional(readOnly = true)
    public List<AllocationResponse> getAllAllocations() {
        return allocationRepository.findAll()
            .stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    /**
     * Get available capacity for an employee in a date range.
     * TC-06-06: Partial availability reported accurately.
     */
    @Transactional(readOnly = true)
    public int getAvailablePercent(Long employeeId, java.time.LocalDate start, java.time.LocalDate end) {
        Integer allocated = allocationRepository.sumAllocatedPercentInRange(employeeId, start, end);
        if (allocated == null) allocated = 0;
        return Math.max(0, maxAllocationPercent - allocated);
    }

    // ===================== PRIVATE HELPERS =====================

    public AllocationResponse mapToResponse(Allocation a) {
        AllocationResponse r = new AllocationResponse();
        r.setId(a.getId());
        r.setEmployeeId(a.getEmployee().getId());
        r.setEmployeeName(a.getEmployee().getName());
        r.setEmployeeCode(a.getEmployee().getEmployeeCode());
        r.setDemandId(a.getDemand().getId());
        r.setProjectName(a.getDemand().getProjectName());
        r.setRole(a.getDemand().getRole());
        r.setStartDate(a.getStartDate());
        r.setEndDate(a.getEndDate());
        r.setAllocationPercent(a.getAllocationPercent());
        r.setStatus(a.getStatus());
        r.setApprovedBy(a.getApprovedBy());
        r.setApprovedAt(a.getApprovedAt());
        r.setCreatedAt(a.getCreatedAt());
        return r;
    }
}
