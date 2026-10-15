package com.talentallocation.backend;

import com.talentallocation.backend.service.AuthService;
import com.talentallocation.backend.service.AuthService.UserPrincipal;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
@RequiredArgsConstructor
@Slf4j
public class AuthInterceptor implements HandlerInterceptor {

    private final AuthService authService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String method = request.getMethod();
        String path = request.getRequestURI();

        // 1. Allow all pre-flight OPTIONS requests for CORS
        if ("OPTIONS".equalsIgnoreCase(method)) {
            return true;
        }

        // 2. Allow public endpoints
        if (path.startsWith("/api/auth/") ||
            (path.equals("/api/skills") && "GET".equalsIgnoreCase(method)) ||
            path.startsWith("/h2-console")) {
            return true;
        }

        // 3. Extract Bearer token
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            log.warn("Unauthorized API call without Bearer token to: {}", path);
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.getWriter().write("{\"error\":\"Authentication required. Please log in.\",\"status\":401}");
            return false;
        }

        String token = authHeader.substring(7);
        UserPrincipal user = authService.validateToken(token);
        if (user == null) {
            log.warn("Invalid or expired token for path: {}", path);
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.getWriter().write("{\"error\":\"Invalid or expired session. Please log in again.\",\"status\":401}");
            return false;
        }

        // 4. Role-based Authorization:
        // Employee Self-Service endpoints require ROLE_EMPLOYEE
        if (path.startsWith("/api/self-service/")) {
            if (!"ROLE_EMPLOYEE".equals(user.getRole())) {
                log.warn("Access denied: User with role {} attempted self-service: {}", user.getRole(), path);
                response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                response.setContentType("application/json");
                response.getWriter().write("{\"error\":\"Access denied: Employee role required\",\"status\":403}");
                return false;
            }
            return true;
        }

        // Manager-only endpoints: /api/employees (except self-service), /api/demands, /api/allocations, /api/ai, /api/reports
        if (path.startsWith("/api/demands") ||
            path.startsWith("/api/allocations") ||
            path.startsWith("/api/ai") ||
            path.startsWith("/api/reports") ||
            path.startsWith("/api/employees")) {
            
            if (!"ROLE_MANAGER".equals(user.getRole())) {
                log.warn("Access denied: Employee {} attempted manager endpoint: {}", user.getEmployeeCode(), path);
                response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                response.setContentType("application/json");
                response.getWriter().write("{\"error\":\"Access denied: Manager authorization required\",\"status\":403}");
                return false;
            }
        }

        return true;
    }
}
