package com.openclassrooms.mddapi.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import java.util.List;

public record AppUserDto(
        @NotBlank()
        Long id,

        @NotBlank()
        @Email()
        String email,

        @NotBlank()
        String username,

        List<ThemeDto> themes
) {
}
