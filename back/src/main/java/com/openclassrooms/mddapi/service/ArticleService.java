package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.entity.AppUser;
import com.openclassrooms.mddapi.entity.Article;
import com.openclassrooms.mddapi.entity.Theme;
import com.openclassrooms.mddapi.mapper.ArticleMapper;
import com.openclassrooms.mddapi.model.ArticleDto;
import com.openclassrooms.mddapi.model.ArticleToCreate;
import com.openclassrooms.mddapi.repository.ArticleRepository;
import com.openclassrooms.mddapi.repository.ThemeRepository;
import com.openclassrooms.mddapi.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

/**
 * Service class for managing article operations.
 * Handles article creation, retrieval, and mapping operations.
 */
@Service
@RequiredArgsConstructor
public class ArticleService {

    private final ArticleRepository articleRepository;
    private final ArticleMapper articleMapper;
    private final UserRepository userRepository;
    private final ThemeRepository themeRepository;


    /**
     * Retrieves all the articles from the repository and converts them into a list of ArticleDto objects.
     *
     * @return a list of ArticleDto objects representing all the articles in the repository
     */
    public List<ArticleDto> findAll() {
        return articleRepository.findAll()
                .stream()
                .map(articleMapper::toDto)
                .toList();
    }

    /**
     * Retrieves articles linked to the authenticated user's subscribed themes.
     * Articles are ordered by creation date descending.
     *
     * @param jwt the JWT of the authenticated user
     * @return list of ArticleDto for user's themes
     */
    public List<ArticleDto> findAllForUserThemes(Jwt jwt) {
        AppUser appUser = userRepository.findByUsername(jwt.getSubject())
                .orElseThrow(() -> new EntityNotFoundException("Utilisateur non trouvé: login= " + jwt.getSubject()));

        List<Long> themeIds = appUser.getThemes().stream().map(Theme::getId).toList();

        if (themeIds.isEmpty()) {
            return List.of();
        }

        return articleRepository.findByTheme_IdInOrderByCreatedAtDesc(themeIds)
                .stream()
                .map(articleMapper::toDto)
                .toList();
    }

    /**
     * Finds an article by its ID and converts it to an ArticleDto.
     *
     * @param id the ID of the article to find
     * @return the corresponding ArticleDto
     * @throws EntityNotFoundException if the article is not found
     */
    public ArticleDto findById(Long id) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Article non trouvé: id= " + id));

        return articleMapper.toDto(article);
    }

    /**
     * Creates and saves a new article in the repository based on the provided data.
     * The method uses the author's JWT token to identify the author of the article
     * and associates the article with a specific theme.
     *
     * @param articleToCreate an object containing the details of the article to be created,
     *                        including theme ID, title, and content
     * @param jwt              the JWT token of the authenticated user, used to identify the author
     */
    public void create(ArticleToCreate articleToCreate, Jwt jwt) {
        AppUser author = userRepository.findByUsername(jwt.getSubject())
                .orElseThrow(() -> new EntityNotFoundException("Utilisateur non trouvé: login= " + jwt.getSubject()));

        Theme theme = themeRepository.findById(articleToCreate.themeId())
                .orElseThrow(() -> new EntityNotFoundException("Thème non trouvé: id= " + articleToCreate.themeId()));

        try {
            Article article = new Article();
            article.setTitle(articleToCreate.title());
            article.setContent(articleToCreate.content());
            article.setCreatedAt(new Date());
            article.setAuthor(author);
            article.setTheme(theme);
            articleRepository.save(article);
        }
        catch(Exception e) {
            throw new EntityNotFoundException("Impossible d'ajouter l'article: " + e.getMessage());
        }

    }


}
