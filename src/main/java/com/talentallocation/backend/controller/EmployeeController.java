package com.talentallocation.backend.controller;

import com.talentallocation.backend.dto.*;
import com.talentallocation.backend.service.EmployeeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * Employee REST Controller
 * POST /api/employees       - Create employee
 * GET  /api/employees       - List all employees
 * GET  /api/employees/{id}  - Get employee by ID
 * POST /api/employees/{id}/skills - Add skill to employee
 */
@RestController
@RequestMapping("/api/employees")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class EmployeeController {

    private final EmployeeService employeeService;

    @PostMapping
    public ResponseEntity<EmployeeResponse> createEmployee(
            @Valid @RequestBody EmployeeRequest request) {
        EmployeeResponse response = employeeService.createEmployee(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<EmployeeResponse>> getAllEmployees() {
        return ResponseEntity.ok(employeeService.getAllEmployees());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeResponse> getEmployee(@PathVariable Long id) {
        return ResponseEntity.ok(employeeService.getEmployee(id));
    }

    @PostMapping("/{id}/skills")
    public ResponseEntity<EmployeeResponse> addSkill(
            @PathVariable Long id,
            @Valid @RequestBody EmployeeSkillRequest request) {
        return ResponseEntity.ok(employeeService.addSkill(id, request));
    }
}
