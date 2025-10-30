package com.openclassrooms.mddapi.repository;

import com.openclassrooms.mddapi.entity.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

/**
 * Repository interface for Article entity.
 * Provides data access operations for article entities.
 */
@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
    List<Article> findByTheme_IdInOrderByCreatedAtDesc(Collection<Long> themeIds);
}
