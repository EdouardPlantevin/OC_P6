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

@Tag(name = "Authentication")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody @Valid UserCredentials credentials) {
        LoginResponse loginResponse = userService.authenticateUser(credentials);
        return ResponseEntity.ok(loginResponse);
    }

    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody @Valid UserRegister userRegister) {
        userService.saveUser(userRegister);
        return ResponseEntity.ok().build();
    }

}
