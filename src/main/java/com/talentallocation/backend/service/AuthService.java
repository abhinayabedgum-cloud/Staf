package com.talentallocation.backend.service;

import com.talentallocation.backend.exception.BusinessRuleException;
import com.talentallocation.backend.model.Employee;
import com.talentallocation.backend.repository.EmployeeRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Authentication & Session Management service.
 * Manages secure tokens for ROLE_MANAGER and ROLE_EMPLOYEE.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final EmployeeRepository employeeRepository;

    @Data
    @AllArgsConstructor
    public static class UserPrincipal {
        private String token;
        private String role; // ROLE_MANAGER or ROLE_EMPLOYEE
        private Long employeeId;
        private String employeeCode;
        private String name;
        private String email;
    }

    // In-memory active tokens registry
    private final Map<String, UserPrincipal> activeTokens = new ConcurrentHashMap<>();

    public UserPrincipal managerLogin(String username, String password) {
        if (("manager".equalsIgnoreCase(username) || "admin".equalsIgnoreCase(username))
                && "admin123".equals(password)) {
            String token = "mgr-" + UUID.randomUUID().toString();
            UserPrincipal principal = new UserPrincipal(token, "ROLE_MANAGER", null, "MGR001", "Resource Manager", "manager@talentsync.io");
            activeTokens.put(token, principal);
            log.info("Manager login successful: {}", username);
            return principal;
        }
        throw new BusinessRuleException("Invalid manager credentials. Use username: 'manager' and password: 'admin123'.");
    }

    public UserPrincipal employeeLogin(String employeeCode, String email) {
        if (employeeCode == null || employeeCode.isBlank()) {
            throw new BusinessRuleException("Employee Code is required.");
        }
        Employee emp = employeeRepository.findByEmployeeCode(employeeCode.trim().toUpperCase())
                .orElseThrow(() -> new BusinessRuleException("Employee not found with code: " + employeeCode));

        if (emp.getEmploymentStatus() != Employee.EmploymentStatus.ACTIVE) {
            throw new BusinessRuleException("Employee account status is " + emp.getEmploymentStatus() + ". Only ACTIVE employees can access self-service.");
        }

        if (email != null && !email.isBlank()) {
            if (emp.getEmail() != null && !emp.getEmail().equalsIgnoreCase(email.trim())) {
                throw new BusinessRuleException("Email does not match records for employee " + employeeCode);
            }
        }

        String token = "emp-" + UUID.randomUUID().toString();
        UserPrincipal principal = new UserPrincipal(token, "ROLE_EMPLOYEE", emp.getId(), emp.getEmployeeCode(), emp.getName(), emp.getEmail());
        activeTokens.put(token, principal);
        log.info("Employee login successful: {} ({})", emp.getName(), emp.getEmployeeCode());
        return principal;
    }

    public UserPrincipal validateToken(String token) {
        if (token == null || token.isBlank()) return null;
        return activeTokens.get(token.trim());
    }

    public void logout(String token) {
        if (token != null) activeTokens.remove(token.trim());
    }
}
