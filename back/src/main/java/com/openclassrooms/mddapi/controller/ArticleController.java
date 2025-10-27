package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.model.ArticleDto;
import com.openclassrooms.mddapi.model.ArticleToCreate;
import com.openclassrooms.mddapi.service.ArticleService;
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
 * REST controller for handling article-related operations.
 * Manages article creation and retrieval with authentication.
 */
@Tag(name = "Articles")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/articles")
@SecurityScheme(name = "bearerAuth", type = SecuritySchemeType.HTTP, scheme = "bearer", bearerFormat = "JWT")
public class ArticleController {

    private final ArticleService articleService;

    /**
     * Retrieves all articles from the database.
     *
     * @return List of all articles as DTOs
     */
    @GetMapping()
    @Operation(security = {@SecurityRequirement(name = "bearerAuth")})
    public List<ArticleDto> findAll() {
        return articleService.findAll();
    }

    /**
     * Creates a new article associated with a specific theme.
     *
     * @param articleToCreate the article data to create
     * @param jwt the authentication token of the current user
     * @return ResponseEntity indicating successful creation
     */
    @PostMapping
    @Operation(security = {@SecurityRequirement(name = "bearerAuth")})
    public ResponseEntity<Void> createArticle(
            @Valid @RequestBody ArticleToCreate articleToCreate,
            @AuthenticationPrincipal Jwt jwt
    ) {
        articleService.create(articleToCreate, jwt);
        return ResponseEntity.ok().build();
    }


}
