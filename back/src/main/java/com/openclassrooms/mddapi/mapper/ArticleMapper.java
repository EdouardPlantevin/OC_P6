package com.openclassrooms.mddapi.mapper;

import com.openclassrooms.mddapi.entity.Article;
import com.openclassrooms.mddapi.model.ArticleDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

/**
 * Mapper for converting between Article entity and ArticleDto.
 * Handles the mapping of articles including their comments.
 */
@Component
@RequiredArgsConstructor
public class ArticleMapper {

    private final CommentMapper commentMapper;

    /**
     * Converts an Article entity to an ArticleDto.
     *
     * @param article the article entity to convert
     * @return the corresponding ArticleDto
     */
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