package com.talentallocation.backend.service;

import com.talentallocation.backend.dto.*;
import com.talentallocation.backend.exception.BusinessRuleException;
import com.talentallocation.backend.exception.ResourceNotFoundException;
import com.talentallocation.backend.model.*;
import com.talentallocation.backend.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Employee Service - manages employee CRUD and skill assignment.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final SkillRepository skillRepository;
    private final EmployeeSkillRepository employeeSkillRepository;

    @Transactional
    public EmployeeResponse createEmployee(EmployeeRequest request) {
        if (employeeRepository.existsByEmployeeCode(request.getEmployeeCode())) {
            throw new BusinessRuleException(
                "Employee with code '" + request.getEmployeeCode() + "' already exists.");
        }
        Employee employee = new Employee();
        mapRequestToEmployee(request, employee);
        Employee saved = employeeRepository.save(employee);
        log.info("Created employee: {} ({})", saved.getName(), saved.getEmployeeCode());
        return mapToResponse(saved);
    }

    @Transactional(readOnly = true)
    public EmployeeResponse getEmployee(Long id) {
        Employee employee = findEmployeeById(id);
        return mapToResponse(employee);
    }

    @Transactional(readOnly = true)
    public List<EmployeeResponse> getAllEmployees() {
        return employeeRepository.findAll()
            .stream()
            .map(this::mapToResponse)
            .collect(Collectors.toList());
    }

    @Transactional
    public EmployeeResponse addSkill(Long employeeId, EmployeeSkillRequest request) {
        Employee employee = findEmployeeById(employeeId);
        Skill skill = skillRepository.findById(request.getSkillId())
            .orElseThrow(() -> new ResourceNotFoundException(
                "Skill not found with id: " + request.getSkillId()));

        // Check if employee already has this skill
        Optional<EmployeeSkill> existing = employeeSkillRepository
            .findByEmployeeIdAndSkillId(employeeId, request.getSkillId());

        EmployeeSkill employeeSkill = existing.orElse(new EmployeeSkill());
        employeeSkill.setEmployee(employee);
        employeeSkill.setSkill(skill);
        employeeSkill.setProficiencyLevel(request.getProficiencyLevel());
        if (request.getLastValidatedAt() != null && !request.getLastValidatedAt().isBlank()) {
            employeeSkill.setLastValidatedAt(LocalDate.parse(request.getLastValidatedAt()));
        }
        employeeSkill.setEvidence(request.getEvidence());
        employeeSkillRepository.save(employeeSkill);

        log.info("Added/updated skill '{}' for employee {}", skill.getName(), employee.getName());
        return mapToResponse(findEmployeeById(employeeId));
    }

    // ===================== PRIVATE HELPERS =====================

    public Employee findEmployeeById(Long id) {
        return employeeRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));
    }

    private void mapRequestToEmployee(EmployeeRequest request, Employee employee) {
        employee.setEmployeeCode(request.getEmployeeCode());
        employee.setName(request.getName());
        employee.setLocation(request.getLocation());
        employee.setEmploymentStatus(request.getEmploymentStatus());
        employee.setDepartment(request.getDepartment());
        employee.setEmail(request.getEmail());
    }

    public EmployeeResponse mapToResponse(Employee employee) {
        EmployeeResponse response = new EmployeeResponse();
        response.setId(employee.getId());
        response.setEmployeeCode(employee.getEmployeeCode());
        response.setName(employee.getName());
        response.setLocation(employee.getLocation());
        response.setEmploymentStatus(employee.getEmploymentStatus());
        response.setDepartment(employee.getDepartment());
        response.setEmail(employee.getEmail());

        List<EmployeeSkill> skills = employeeSkillRepository.findByEmployeeId(employee.getId());
        List<EmployeeResponse.SkillResponse> skillResponses = skills.stream().map(es -> {
            EmployeeResponse.SkillResponse sr = new EmployeeResponse.SkillResponse();
            sr.setId(es.getId());
            sr.setSkillName(es.getSkill().getName());
            sr.setCategory(es.getSkill().getCategory());
            sr.setProficiencyLevel(es.getProficiencyLevel());
            sr.setProficiencyLabel(getProficiencyLabel(es.getProficiencyLevel()));
            sr.setLastValidatedAt(
                es.getLastValidatedAt() != null ? es.getLastValidatedAt().toString() : null);
            sr.setEvidence(es.getEvidence());
            return sr;
        }).collect(Collectors.toList());
        response.setSkills(skillResponses);
        return response;
    }

    public static String getProficiencyLabel(int level) {
        return switch (level) {
            case 1 -> "Beginner";
            case 2 -> "Intermediate";
            case 3 -> "Advanced";
            case 4 -> "Expert";
            case 5 -> "Master";
            default -> "Unknown";
        };
    }
}
