package com.openclassrooms.mddapi.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record UserRegister(
        @NotBlank()
        String username,

        @Email()
        @NotBlank()
        String email,

        @NotBlank()
        @Pattern(regexp = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")
        String password
) {
}
