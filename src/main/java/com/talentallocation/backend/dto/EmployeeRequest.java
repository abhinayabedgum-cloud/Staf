package com.talentallocation.backend.dto;

import com.talentallocation.backend.model.Employee;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

/** DTO for creating/updating an Employee */
@Data
public class EmployeeRequest {
    @NotBlank(message = "Employee code is required")
    private String employeeCode;

    @NotBlank(message = "Name is required")
    private String name;

    private String location;

    @NotNull(message = "Employment status is required")
    private Employee.EmploymentStatus employmentStatus;

    private String department;

    @Email(message = "Invalid email format")
    private String email;
}
