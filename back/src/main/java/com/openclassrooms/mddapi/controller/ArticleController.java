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

@Tag(name = "Articles")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/articles")
@SecurityScheme(name = "bearerAuth", type = SecuritySchemeType.HTTP, scheme = "bearer", bearerFormat = "JWT")
public class ArticleController {

    private final ArticleService articleService;

    @GetMapping()
    @Operation(security = {@SecurityRequirement(name = "bearerAuth")})
    public List<ArticleDto> findAll() {
        return articleService.findAll();
    }

    @GetMapping("/{id}")
    @Operation(security = {@SecurityRequirement(name = "bearerAuth")})
    public ArticleDto findById(@PathVariable Long id) {
        return articleService.findById(id);
    }


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
