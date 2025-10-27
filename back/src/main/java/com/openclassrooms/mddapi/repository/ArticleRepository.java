package com.openclassrooms.mddapi.repository;

import com.openclassrooms.mddapi.entity.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for Article entity.
 * Provides data access operations for article entities.
 */
@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
}
