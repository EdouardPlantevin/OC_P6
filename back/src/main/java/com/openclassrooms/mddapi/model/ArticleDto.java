package com.openclassrooms.mddapi.model;

import jakarta.validation.constraints.NotNull;

import java.util.Date;

public record ArticleDto(
        @NotNull
        Long id,

        @NotNull
        String title,

        @NotNull
        Date createdAt,

        @NotNull
        AppUserDto author,

        @NotNull
        String content,

        @NotNull
        ThemeDto theme
) {
}
