package com.openclassrooms.mddapi.mapper;

import com.openclassrooms.mddapi.entity.Comment;
import com.openclassrooms.mddapi.entity.Theme;
import com.openclassrooms.mddapi.model.CommentDto;
import com.openclassrooms.mddapi.model.ThemeResponse;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CommentMapper {
    public CommentDto toDto(Comment comment) {
        return new CommentDto(
                comment.getContent(),
                comment.getCreatedAt(),
                comment.getAuthor().getUsername()
        );
    }
}
