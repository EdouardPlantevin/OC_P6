package com.openclassrooms.mddapi.mapper;

import com.openclassrooms.mddapi.entity.Article;
import com.openclassrooms.mddapi.model.ArticleDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ArticleMapper {

    private final ThemeMapper themeMapper;
    private final AppUserMapper appUserMapper;
    private final CommentMapper commentMapper;

    public ArticleDto toDto(Article article) {
        return new ArticleDto(
                article.getId(),
                article.getTitle(),
                article.getCreatedAt(),
                article.getAuthor().getUsername(),
                article.getContent(),
                article.getTheme().getTitle(),
                article.getComments().stream()
                        .map(commentMapper::toDto)
                        .toList()
        );
    }
}