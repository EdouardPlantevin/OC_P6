package com.openclassrooms.mddapi.model;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ArticleToCreate(
        @NotNull
        Long themeId,

        @NotBlank
        String title,

        @NotBlank
        String content
) {
}
