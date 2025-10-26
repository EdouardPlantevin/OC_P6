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

    public ArticleDto toDto(Article article) {
        return new ArticleDto(
                article.getId(),
                article.getTitle(),
                article.getCreatedAt(),
                appUserMapper.toDto(article.getAuthor()),
                article.getContent(),
                article.getTheme().getTitle()
        );
    }
}