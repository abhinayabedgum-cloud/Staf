package com.talentallocation.backend.controller;

import com.talentallocation.backend.dto.EmployeeResponse;
import com.talentallocation.backend.dto.EmployeeSelfServiceRequest;
import com.talentallocation.backend.service.AuthService;
import com.talentallocation.backend.service.AuthService.UserPrincipal;
import com.talentallocation.backend.service.EmployeeSelfServiceService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/self-service")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class EmployeeSelfServiceController {

    private final EmployeeSelfServiceService selfService;
    private final AuthService authService;

    private Long getAuthenticatedEmployeeId(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Unauthorized: No Bearer token provided");
        }
        String token = authHeader.substring(7);
        UserPrincipal user = authService.validateToken(token);
        if (user == null || !"ROLE_EMPLOYEE".equals(user.getRole())) {
            throw new RuntimeException("Access Denied: Only authenticated employees may access self-service");
        }
        return user.getEmployeeId();
    }

    @GetMapping("/profile")
    public ResponseEntity<EmployeeResponse> getMyProfile(HttpServletRequest request) {
        Long employeeId = getAuthenticatedEmployeeId(request);
        return ResponseEntity.ok(selfService.getProfile(employeeId));
    }

    @PutMapping("/profile")
    public ResponseEntity<EmployeeResponse> updateMyProfile(
            HttpServletRequest request,
            @Valid @RequestBody EmployeeSelfServiceRequest body) {
        Long employeeId = getAuthenticatedEmployeeId(request);
        return ResponseEntity.ok(selfService.updateProfile(employeeId, body));
    }
}
