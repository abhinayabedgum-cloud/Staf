package com.talentallocation.backend.controller;

import com.talentallocation.backend.repository.AllocationRepository;
import com.talentallocation.backend.service.DemandService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Reports Controller
 * GET /api/reports/utilization          - Utilization by employee and department
 * GET /api/resources/available          - Available resources for date range + skill filters
 */
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ReportsController {

    private final AllocationRepository allocationRepository;
    private final DemandService demandService;

    @GetMapping("/api/reports/utilization")
    public ResponseEntity<List<Map<String, Object>>> getUtilization(
            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {

        LocalDate from = startDate != null ? startDate : LocalDate.now().withDayOfMonth(1);
        LocalDate to = endDate != null ? endDate : LocalDate.now();

        return ResponseEntity.ok(
            allocationRepository.findUtilizationInRange(from, to).stream()
                .map(a -> {
                    Map<String, Object> row = new LinkedHashMap<>();
                    row.put("allocationId", a.getId());
                    row.put("employeeId", a.getEmployee().getId());
                    row.put("employeeName", a.getEmployee().getName());
                    row.put("employeeCode", a.getEmployee().getEmployeeCode());
                    row.put("department", a.getEmployee().getDepartment());
                    row.put("projectName", a.getDemand().getProjectName());
                    row.put("role", a.getDemand().getRole());
                    row.put("allocationPercent", a.getAllocationPercent());
                    row.put("startDate", a.getStartDate());
                    row.put("endDate", a.getEndDate());
                    row.put("status", a.getStatus());
                    return row;
                })
                .collect(Collectors.toList())
        );
    }

    @GetMapping("/api/resources/available")
    public ResponseEntity<List<Map<String, Object>>> getAvailableResources(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @RequestParam(required = false) Long skillId) {

        List<Object[]> rows = allocationRepository.findAvailableResourcesRaw(startDate, endDate, 100);
        List<Map<String, Object>> result = rows.stream().map(r -> {
            Map<String, Object> row = new LinkedHashMap<>();
            row.put("employeeId", r[0]);
            row.put("name", r[1]);
            row.put("location", r[2]);
            row.put("department", r[3]);
            row.put("allocatedPercent", r[4]);
            row.put("availablePercent", 100 - ((Number) r[4]).intValue());
            return row;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(result);
    }
}
