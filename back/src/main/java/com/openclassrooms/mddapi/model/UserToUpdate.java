package com.openclassrooms.mddapi.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record UserToUpdate(
        @NotBlank()
        String username,

        @Email()
        @NotBlank()
        String email,

        String password
) {
}
