package com.talentallocation.backend.service;

import com.talentallocation.backend.dto.DemandRequest;
import com.talentallocation.backend.dto.DemandResponse;
import com.talentallocation.backend.exception.BusinessRuleException;
import com.talentallocation.backend.exception.ResourceNotFoundException;
import com.talentallocation.backend.model.ProjectDemand;
import com.talentallocation.backend.model.Skill;
import com.talentallocation.backend.repository.ProjectDemandRepository;
import com.talentallocation.backend.repository.SkillRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Demand Service - manages project demands lifecycle.
 * Business Rules:
 *  - Demand must have a role, valid dates (start before end).
 *  - allocationPercent must be 1–100.
 *  - Dates must not be in the past on creation.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class DemandService {

    private final ProjectDemandRepository demandRepository;
    private final SkillRepository skillRepository;

    @Transactional
    public DemandResponse createDemand(DemandRequest request) {
        validateDemandRequest(request);

        ProjectDemand demand = new ProjectDemand();
        demand.setProjectName(request.getProjectName());
        demand.setRole(request.getRole());
        demand.setStartDate(request.getStartDate());
        demand.setEndDate(request.getEndDate());
        demand.setLocation(request.getLocation());
        demand.setAllocationPercent(request.getAllocationPercent());
        demand.setPriority(request.getPriority());
        demand.setStatus(ProjectDemand.DemandStatus.OPEN);
        demand.setDescription(request.getDescription());

        // Store required skill IDs as comma-separated string
        if (request.getRequiredSkillIds() != null && !request.getRequiredSkillIds().isEmpty()) {
            String skillIds = request.getRequiredSkillIds()
                .stream().map(Object::toString).collect(Collectors.joining(","));
            demand.setRequiredSkillIds(skillIds);
        }

        ProjectDemand saved = demandRepository.save(demand);
        log.info("Created demand: {} for role {} (ID: {})", saved.getProjectName(), saved.getRole(), saved.getId());
        return mapToResponse(saved);
    }

    @Transactional(readOnly = true)
    public DemandResponse getDemand(Long id) {
        return mapToResponse(findDemandById(id));
    }

    @Transactional(readOnly = true)
    public List<DemandResponse> getAllDemands(String status, String role) {
        List<ProjectDemand> demands;
        if (status != null && !status.isBlank()) {
            ProjectDemand.DemandStatus demandStatus = ProjectDemand.DemandStatus.valueOf(status.toUpperCase());
            demands = demandRepository.findByStatus(demandStatus);
        } else {
            demands = demandRepository.findAll();
        }
        // Filter by role if provided
        if (role != null && !role.isBlank()) {
            String roleLower = role.toLowerCase();
            demands = demands.stream()
                .filter(d -> d.getRole().toLowerCase().contains(roleLower))
                .collect(Collectors.toList());
        }
        return demands.stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<DemandResponse> getOpenDemands() {
        return demandRepository.findOpenDemandsByRole(null)
            .stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<DemandResponse> getDemandsWithNoAllocation() {
        return demandRepository.findDemandsWithNoAllocation()
            .stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    // ===================== PRIVATE HELPERS =====================

    public ProjectDemand findDemandById(Long id) {
        return demandRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Demand not found with id: " + id));
    }

    private void validateDemandRequest(DemandRequest request) {
        // TC-06-02: Role required
        if (request.getRole() == null || request.getRole().isBlank()) {
            throw new BusinessRuleException("Role is required for a demand.");
        }
        // TC-06-02: Dates required and valid
        if (request.getStartDate() == null || request.getEndDate() == null) {
            throw new BusinessRuleException("Both start date and end date are required.");
        }
        if (!request.getEndDate().isAfter(request.getStartDate())) {
            throw new BusinessRuleException("End date must be after start date.");
        }
    }

    public DemandResponse mapToResponse(ProjectDemand demand) {
        DemandResponse response = new DemandResponse();
        response.setId(demand.getId());
        response.setProjectName(demand.getProjectName());
        response.setRole(demand.getRole());
        response.setStartDate(demand.getStartDate());
        response.setEndDate(demand.getEndDate());
        response.setLocation(demand.getLocation());
        response.setAllocationPercent(demand.getAllocationPercent());
        response.setPriority(demand.getPriority());
        response.setStatus(demand.getStatus());
        response.setDescription(demand.getDescription());

        // Parse skill IDs and look up skill details
        List<DemandResponse.SkillInfo> skillInfos = new ArrayList<>();
        if (demand.getRequiredSkillIds() != null && !demand.getRequiredSkillIds().isBlank()) {
            for (String idStr : demand.getRequiredSkillIds().split(",")) {
                try {
                    Long skillId = Long.parseLong(idStr.trim());
                    skillRepository.findById(skillId).ifPresent(skill -> {
                        DemandResponse.SkillInfo info = new DemandResponse.SkillInfo();
                        info.setId(skill.getId());
                        info.setName(skill.getName());
                        info.setCategory(skill.getCategory());
                        skillInfos.add(info);
                    });
                } catch (NumberFormatException ignored) {}
            }
        }
        response.setRequiredSkills(skillInfos);
        return response;
    }

    public List<Long> parseRequiredSkillIds(ProjectDemand demand) {
        List<Long> ids = new ArrayList<>();
        if (demand.getRequiredSkillIds() != null && !demand.getRequiredSkillIds().isBlank()) {
            for (String s : demand.getRequiredSkillIds().split(",")) {
                try { ids.add(Long.parseLong(s.trim())); }
                catch (NumberFormatException ignored) {}
            }
        }
        return ids;
    }
}
