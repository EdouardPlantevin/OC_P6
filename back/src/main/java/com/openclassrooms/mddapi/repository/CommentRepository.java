package com.openclassrooms.mddapi.repository;

import com.openclassrooms.mddapi.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for Comment entity.
 * Provides data access operations for comment entities.
 */
@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
}
