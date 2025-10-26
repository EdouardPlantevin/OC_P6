package com.openclassrooms.mddapi.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record ThemeResponse(
        @NotNull
        Long id,

        @NotBlank()
        @Size(min = 3, max = 50)
        String title,

        @NotBlank()
        @Size(min = 3, max = 1000)
        String description,

        Boolean subscribe
) {
}
