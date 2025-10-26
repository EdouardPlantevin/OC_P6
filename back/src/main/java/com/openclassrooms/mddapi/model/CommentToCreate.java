package com.openclassrooms.mddapi.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CommentToCreate(
        @NotBlank
        String content,

        @NotNull
        Long articleId
) {
}
