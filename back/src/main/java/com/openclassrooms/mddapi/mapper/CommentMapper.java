package com.openclassrooms.mddapi.mapper;

import com.openclassrooms.mddapi.entity.Comment;
import com.openclassrooms.mddapi.model.CommentDto;
import org.springframework.stereotype.Component;

/**
 * Mapper for converting between Comment entity and CommentDto.
 * Handles the mapping of comment information.
 */
@Component
public class CommentMapper {
    
    /**
     * Converts a Comment entity to a CommentDto.
     *
     * @param comment the comment entity to convert
     * @return the corresponding CommentDto
     */
    public CommentDto toDto(Comment comment) {
        return new CommentDto(
                comment.getContent(),
                comment.getCreatedAt(),
                comment.getAuthor().getUsername()
        );
    }
}
