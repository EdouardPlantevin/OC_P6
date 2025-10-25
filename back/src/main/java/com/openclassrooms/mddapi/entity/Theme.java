package com.openclassrooms.mddapi.entity;

import jakarta.persistence.*;
import lombok.Data;

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

}
