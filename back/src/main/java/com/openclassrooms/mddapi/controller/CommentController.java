package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.model.CommentToCreate;
import com.openclassrooms.mddapi.service.CommentService;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * REST controller for handling comment-related operations.
 * Manages comment creation with authentication.
 */
@Tag(name = "Comments")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/comments")
@SecurityScheme(name = "bearerAuth", type = SecuritySchemeType.HTTP, scheme = "bearer", bearerFormat = "JWT")
public class CommentController {

    private final CommentService commentService;

    /**
     * Creates a new comment on an article.
     *
     * @param commentToCreate the comment data to create
     * @param jwt the authentication token of the current user
     */
    @PostMapping()
    public void createComment(
            @Valid @RequestBody CommentToCreate commentToCreate,
            @AuthenticationPrincipal Jwt jwt
    ) {
        commentService.createComment(commentToCreate, jwt);
    }

}
