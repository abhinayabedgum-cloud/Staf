package com.talentallocation.backend.controller;

import com.talentallocation.backend.service.AuthService;
import com.talentallocation.backend.service.AuthService.UserPrincipal;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    @Data
    public static class ManagerLoginDto {
        private String username;
        private String password;
    }

    @Data
    public static class EmployeeLoginDto {
        private String employeeCode;
        private String email;
    }

    @PostMapping("/manager-login")
    public ResponseEntity<UserPrincipal> managerLogin(@RequestBody ManagerLoginDto dto) {
        return ResponseEntity.ok(authService.managerLogin(dto.getUsername(), dto.getPassword()));
    }

    @PostMapping("/employee-login")
    public ResponseEntity<UserPrincipal> employeeLogin(@RequestBody EmployeeLoginDto dto) {
        return ResponseEntity.ok(authService.employeeLogin(dto.getEmployeeCode(), dto.getEmail()));
    }

    @GetMapping("/me")
    public ResponseEntity<?> getMe(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body(Map.of("error", "Unauthenticated"));
        }
        String token = authHeader.substring(7);
        UserPrincipal user = authService.validateToken(token);
        if (user == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid or expired token"));
        }
        return ResponseEntity.ok(user);
    }
}
