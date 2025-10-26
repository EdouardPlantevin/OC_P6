package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.entity.AppUser;
import com.openclassrooms.mddapi.entity.Article;
import com.openclassrooms.mddapi.entity.Comment;
import com.openclassrooms.mddapi.model.CommentToCreate;
import com.openclassrooms.mddapi.repository.ArticleRepository;
import com.openclassrooms.mddapi.repository.CommentRepository;
import com.openclassrooms.mddapi.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final ArticleRepository articleRepository;


    /**
     * Creates a new comment and associates it with the specified article and user.
     *
     * @param commentToCreate the object containing the content of the comment and the ID of the article to associate it with
     * @param jwt the JSON Web Token containing the authenticated user's information
     * @throws EntityNotFoundException if the user is not found, the article is not found, or the comment could not be saved
     */
    public void createComment(CommentToCreate commentToCreate, Jwt jwt) {
        AppUser author = userRepository.findByUsername(jwt.getSubject())
                .orElseThrow(() -> new EntityNotFoundException("Utilisateur non trouvé: login= " + jwt.getSubject()));

        Article article = articleRepository.findById(commentToCreate.articleId()).
            orElseThrow(() -> new EntityNotFoundException("Article non trouvé: id= " + commentToCreate.articleId()));

        try {
            Comment comment = new Comment();
            comment.setAuthor(author);
            comment.setContent(commentToCreate.content());
            comment.setCreatedAt(new Date());
            comment.setArticle(article);

            commentRepository.save(comment);
        } catch (Exception e) {
            throw new EntityNotFoundException("Impossible d'ajouter le commentaire: " + e.getMessage());
        }
    }

}
