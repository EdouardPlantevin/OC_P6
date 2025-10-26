package com.openclassrooms.mddapi.model;

import jakarta.validation.constraints.NotBlank;

import java.util.Date;

public record CommentDto(
        @NotBlank
        String content,

        @NotBlank
        Date createdAt,

        @NotBlank
        String author
) {
}
