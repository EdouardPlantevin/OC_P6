package com.openclassrooms.mddapi.model;

import java.util.List;

public record LoginResponse(
        String token,
        String type,
        Long id,
        String email,
        String username,
        List<ThemeDto> themes
) {
    public LoginResponse(String token, Long id, String email, String username, List<ThemeDto> themes) {
        this(token, "Bearer", id, email, username, themes);
    }
}
