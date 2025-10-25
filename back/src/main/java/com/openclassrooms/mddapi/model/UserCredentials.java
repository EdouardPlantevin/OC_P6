package com.openclassrooms.mddapi.model;

import jakarta.validation.constraints.NotBlank;

public record UserCredentials(
        @NotBlank()
        String login,

        @NotBlank()
        String password
) {
}
