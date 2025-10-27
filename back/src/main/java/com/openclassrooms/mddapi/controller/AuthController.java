package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.model.LoginResponse;
import com.openclassrooms.mddapi.model.UserCredentials;
import com.openclassrooms.mddapi.model.UserRegister;
import com.openclassrooms.mddapi.service.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * REST controller for handling authentication endpoints.
 * Provides endpoints for user login and registration operations.
 */
@Tag(name = "Authentication")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    /**
     * Authenticates a user and returns a JWT token.
     *
     * @param credentials the user credentials containing login and password
     * @return ResponseEntity containing the login response with JWT token
     */
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody @Valid UserCredentials credentials) {
        LoginResponse loginResponse = userService.authenticateUser(credentials);
        return ResponseEntity.ok(loginResponse);
    }

    /**
     * Registers a new user in the system.
     *
     * @param userRegister the user registration data
     * @return ResponseEntity indicating successful registration
     */
    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody @Valid UserRegister userRegister) {
        userService.saveUser(userRegister);
        return ResponseEntity.ok().build();
    }

}
