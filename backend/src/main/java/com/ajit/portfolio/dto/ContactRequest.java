package com.ajit.portfolio.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ContactRequest(
        @NotBlank(message = "name is required")
        @Size(max = 100, message = "name must be at most 100 characters")
        String name,

        @NotBlank(message = "email is required")
        @Email(message = "email must be a valid address")
        @Size(max = 254, message = "email must be at most 254 characters")
        String email,

        @NotBlank(message = "subject is required")
        @Size(max = 150, message = "subject must be at most 150 characters")
        String subject,

        @NotBlank(message = "message is required")
        @Size(min = 5, max = 5000, message = "message must be between 5 and 5000 characters")
        String message
) {
}
