package com.openclassrooms.mddapi.model;

import jakarta.validation.constraints.NotNull;

import java.util.Date;
import java.util.List;

public record ArticleDto(
        @NotNull
        Long id,

        @NotNull
        String title,

        @NotNull
        Date createdAt,

        @NotNull
        String author,

        @NotNull
        String content,

        @NotNull
        String theme,

        List<CommentDto> comments
) {
}
