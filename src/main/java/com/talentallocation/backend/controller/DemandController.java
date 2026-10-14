package com.talentallocation.backend.controller;

import com.talentallocation.backend.dto.*;
import com.talentallocation.backend.service.DemandService;
import com.talentallocation.backend.service.ResourceMatchingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * Demand REST Controller
 * POST /api/demands                         - Create demand
 * GET  /api/demands                         - List demands (with filters)
 * GET  /api/demands/{id}                    - Get demand by ID
 * POST /api/demands/{id}/recommendations    - Get candidate recommendations
 * GET  /api/demands/no-allocation           - Demands with no eligible candidate
 */
@RestController
@RequestMapping("/api/demands")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class DemandController {

    private final DemandService demandService;
    private final ResourceMatchingService resourceMatchingService;

    @PostMapping
    public ResponseEntity<DemandResponse> createDemand(
            @Valid @RequestBody DemandRequest request) {
        DemandResponse response = demandService.createDemand(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<DemandResponse>> getAllDemands(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String role) {
        return ResponseEntity.ok(demandService.getAllDemands(status, role));
    }

    @GetMapping("/{id}")
    public ResponseEntity<DemandResponse> getDemand(@PathVariable Long id) {
        return ResponseEntity.ok(demandService.getDemand(id));
    }

    @PostMapping("/{id}/recommendations")
    public ResponseEntity<List<CandidateRecommendation>> getRecommendations(
            @PathVariable Long id) {
        return ResponseEntity.ok(resourceMatchingService.findCandidatesForDemand(id));
    }

    @GetMapping("/no-allocation")
    public ResponseEntity<List<DemandResponse>> getDemandsWithNoAllocation() {
        return ResponseEntity.ok(demandService.getDemandsWithNoAllocation());
    }
}
