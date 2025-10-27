package com.openclassrooms.mddapi.repository;

import com.openclassrooms.mddapi.entity.Theme;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for Theme entity.
 * Provides data access operations for theme entities.
 */
@Repository
public interface ThemeRepository extends JpaRepository<Theme, Long> {
}
