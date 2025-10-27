package com.openclassrooms.mddapi.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

/**
 * Entity representing a theme or category.
 * Themes can be subscribed to by users and contain articles.
 */
@Entity
@Data
public class Theme {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "theme", fetch = FetchType.LAZY)
    private List<Article> articles;

}
