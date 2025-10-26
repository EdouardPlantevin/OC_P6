package com.openclassrooms.mddapi.model;

public record LoginResponse(
        String token,
        String type,
        Long id,
        String email,
        String username
) {
    public LoginResponse(String token, Long id, String email, String username) {
        this(token, "Bearer", id, email, username);
    }
}
