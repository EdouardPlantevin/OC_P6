package com.openclassrooms.mddapi.controller;


import com.openclassrooms.mddapi.model.SubscriptionRequest;
import com.openclassrooms.mddapi.model.ThemeResponse;
import com.openclassrooms.mddapi.service.ThemeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for handling theme-related operations.
 * Manages theme retrieval and user subscriptions with authentication.
 */
@Tag(name = "Theme")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/themes")
@SecurityScheme(name = "bearerAuth", type = SecuritySchemeType.HTTP, scheme = "bearer", bearerFormat = "JWT")
public class ThemeController {

    private final ThemeService themeService;

    /**
     * Retrieves all themes with subscription status for the authenticated user.
     *
     * @param jwt the authentication token of the current user
     * @return List of themes with subscription status
     */
    @GetMapping()
    @Operation(security = {@SecurityRequirement(name = "bearerAuth")})
    public List<ThemeResponse> findAll(@AuthenticationPrincipal Jwt jwt) {
        return themeService.findAll(jwt);
    }

    /**
     * Toggles the subscription status of a theme for the authenticated user.
     *
     * @param request the subscription request containing theme ID
     * @param jwt the authentication token of the current user
     * @return ResponseEntity indicating successful operation
     */
    @PostMapping("/toggle-subscription")
    @Operation(security = {@SecurityRequirement(name = "bearerAuth")})
    public ResponseEntity<Void> toggleSubscription(
            @Valid @RequestBody SubscriptionRequest request,
            @AuthenticationPrincipal Jwt jwt
    ) {
        themeService.toggleSubscription(request.themeId(), jwt);
        return ResponseEntity.ok().build();
    }
}
