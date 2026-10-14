package com.talentallocation.backend.controller;

import com.talentallocation.backend.ai.StaffingAgentService;
import lombok.RequiredArgsConstructor;
import lombok.Data;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * AI Staffing Controller
 * POST /api/ai/staffing-advice - Run the AI staffing agent workflow
 */
@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AiController {

    private final StaffingAgentService staffingAgentService;

    @PostMapping("/staffing-advice")
    public ResponseEntity<StaffingAgentService.AgentResponse> getStaffingAdvice(
            @RequestBody StaffingAdviceRequest request) {
        StaffingAgentService.AgentResponse response =
            staffingAgentService.runStaffingWorkflow(request.getDemandId(), request.getQuestion());
        return ResponseEntity.ok(response);
    }

    @Data
    public static class StaffingAdviceRequest {
        private Long demandId;
        private String question;
    }
}
