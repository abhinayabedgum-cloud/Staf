package com.talentallocation.backend.service;

import com.talentallocation.backend.dto.EmployeeResponse;
import com.talentallocation.backend.dto.EmployeeSelfServiceRequest;
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

@Service
@RequiredArgsConstructor
@Slf4j
public class EmployeeSelfServiceService {

    private final EmployeeRepository employeeRepository;
    private final SkillRepository skillRepository;
    private final EmployeeSkillRepository employeeSkillRepository;
    private final CertificationRepository certificationRepository;
    private final EmployeeService employeeService;

    @Transactional(readOnly = true)
    public EmployeeResponse getProfile(Long employeeId) {
        Employee emp = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + employeeId));
        return employeeService.mapToResponse(emp);
    }

    @Transactional
    public EmployeeResponse updateProfile(Long employeeId, EmployeeSelfServiceRequest request) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + employeeId));

        // 1. Update basic information
        if (request.getCurrentRole() != null) employee.setCurrentRole(request.getCurrentRole().trim());
        if (request.getYearsOfExperience() != null) employee.setYearsOfExperience(request.getYearsOfExperience());
        if (request.getLocation() != null) employee.setLocation(request.getLocation().trim());
        if (request.getDepartment() != null) employee.setDepartment(request.getDepartment().trim());
        if (request.getEmail() != null) employee.setEmail(request.getEmail().trim());

        // 2. Update current project details
        employee.setCurrentProject(request.getCurrentProject());
        employee.setProjectRole(request.getProjectRole());
        employee.setProjectStartDate(request.getProjectStartDate());
        employee.setProjectEndDate(request.getProjectEndDate());
        employee.setProjectCompletionPercent(request.getProjectCompletionPercent());

        // 3. Update availability details
        if (request.getAvailabilityStatus() != null) {
            employee.setAvailabilityStatus(request.getAvailabilityStatus());
        }
        employee.setExpectedAvailabilityDate(request.getExpectedAvailabilityDate());

        employeeRepository.save(employee);

        // 4. Update skills
        if (request.getSkills() != null) {
            // Find existing skills
            List<EmployeeSkill> currentSkills = employeeSkillRepository.findByEmployeeId(employeeId);
            Map<Long, EmployeeSkill> currentSkillMap = currentSkills.stream()
                    .collect(Collectors.toMap(es -> es.getSkill().getId(), es -> es));

            Set<Long> targetSkillIds = new HashSet<>();

            for (EmployeeSelfServiceRequest.SkillItem item : request.getSkills()) {
                if (item.getSkillId() == null) continue;
                targetSkillIds.add(item.getSkillId());

                Skill skill = skillRepository.findById(item.getSkillId())
                        .orElseThrow(() -> new BusinessRuleException("Skill ID not found: " + item.getSkillId()));

                EmployeeSkill es = currentSkillMap.get(item.getSkillId());
                if (es == null) {
                    es = new EmployeeSkill();
                    es.setEmployee(employee);
                    es.setSkill(skill);
                }
                es.setProficiencyLevel(Math.max(1, Math.min(5, item.getProficiencyLevel())));
                if (item.getLastValidatedAt() != null && !item.getLastValidatedAt().isBlank()) {
                    try {
                        es.setLastValidatedAt(LocalDate.parse(item.getLastValidatedAt()));
                    } catch (Exception ignored) {}
                }
                if (item.getEvidence() != null) {
                    es.setEvidence(item.getEvidence().trim());
                }
                employeeSkillRepository.save(es);
            }

            // Remove any skills that were deleted by employee
            for (EmployeeSkill es : currentSkills) {
                if (!targetSkillIds.contains(es.getSkill().getId())) {
                    employeeSkillRepository.delete(es);
                }
            }
        }

        // 5. Update certifications
        if (request.getCertifications() != null) {
            certificationRepository.deleteByEmployeeId(employeeId);
            for (EmployeeSelfServiceRequest.CertificationItem certItem : request.getCertifications()) {
                if (certItem.getName() == null || certItem.getName().isBlank()) continue;
                Certification cert = new Certification();
                cert.setEmployee(employee);
                cert.setName(certItem.getName().trim());
                cert.setIssuingOrganization(certItem.getIssuingOrganization() != null ? certItem.getIssuingOrganization().trim() : null);
                cert.setIssueDate(certItem.getIssueDate());
                cert.setExpiryDate(certItem.getExpiryDate());
                certificationRepository.save(cert);
            }
        }

        log.info("Self-service profile updated successfully for employee: {} ({})", employee.getName(), employee.getEmployeeCode());
        return employeeService.mapToResponse(employeeRepository.findById(employeeId).get());
    }
}
