package com.talentallocation.backend.controller;

import com.talentallocation.backend.dto.AllocationRequest;
import com.talentallocation.backend.dto.AllocationResponse;
import com.talentallocation.backend.service.AllocationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

/**
 * Allocation REST Controller
 * POST /api/allocations           - Create allocation (with approval)
 * GET  /api/allocations           - List all allocations
 * GET  /api/allocations/{id}      - Get allocation by ID
 * PUT  /api/allocations/{id}/cancel - Cancel allocation
 */
@RestController
@RequestMapping("/api/allocations")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AllocationController {

    private final AllocationService allocationService;

    @PostMapping
    public ResponseEntity<AllocationResponse> createAllocation(
            @Valid @RequestBody AllocationRequest request) {
        AllocationResponse response = allocationService.createAllocation(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<AllocationResponse>> getAllAllocations() {
        return ResponseEntity.ok(allocationService.getAllAllocations());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AllocationResponse> getAllocation(@PathVariable Long id) {
        return ResponseEntity.ok(allocationService.getAllocation(id));
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<AllocationResponse> cancelAllocation(
            @PathVariable Long id,
            @RequestBody(required = false) Map<String, String> body) {
        String reason = body != null ? body.getOrDefault("reason", "Cancelled by user") : "Cancelled by user";
        return ResponseEntity.ok(allocationService.cancelAllocation(id, reason));
    }
}
