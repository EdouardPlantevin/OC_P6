package com.openclassrooms.mddapi.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record AppUserDto(
        @NotBlank()
        Long id,

        @NotBlank()
        @Email()
        String email,

        @NotBlank()
        String username
) {
}
