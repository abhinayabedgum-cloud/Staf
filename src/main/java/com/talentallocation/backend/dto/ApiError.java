package com.talentallocation.backend.dto;

import lombok.Data;
import java.util.List;

/** Standard API error response */
@Data
public class ApiError {
    private int status;
    private String error;
    private String message;
    private List<String> details;
    private String timestamp;

    public ApiError(int status, String error, String message) {
        this.status = status;
        this.error = error;
        this.message = message;
        this.timestamp = java.time.LocalDateTime.now().toString();
    }

    public ApiError(int status, String error, String message, List<String> details) {
        this(status, error, message);
        this.details = details;
    }
}
