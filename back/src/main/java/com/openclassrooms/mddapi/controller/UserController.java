package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.model.UserToUpdate;
import com.openclassrooms.mddapi.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Users")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @PutMapping("/update")
    @Operation(security = {@SecurityRequirement(name = "bearerAuth")})
    public void update(
            @Valid @RequestBody UserToUpdate userToUpdate,
            @AuthenticationPrincipal Jwt jwt
    ) {
        userService.updateUser(userToUpdate, jwt);
    }


}
