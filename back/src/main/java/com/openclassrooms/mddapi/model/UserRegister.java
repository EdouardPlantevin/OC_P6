package com.openclassrooms.mddapi.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record UserRegister(
        @NotBlank()
        String username,

        @Email()
        @NotBlank()
        String email,

        @NotBlank()
        String password
) {
}
