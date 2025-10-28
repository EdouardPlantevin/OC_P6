-- Script SQL pour MDD - Données de démonstration
-- Suppression des données existantes
DELETE FROM comment;
DELETE FROM article;
DELETE FROM user_theme;
DELETE FROM app_user;
DELETE FROM theme;

-- Réinitialisation des AUTO_INCREMENT
ALTER TABLE app_user AUTO_INCREMENT = 1;
ALTER TABLE article AUTO_INCREMENT = 1;
ALTER TABLE comment AUTO_INCREMENT = 1;

-- Insertion des thèmes (si pas déjà présents)
INSERT IGNORE INTO theme (id, title, description) VALUES
(1, 'Technologies et langages de programmation', 'Tout ce qui concerne l\'évolution, l\'utilisation et les tendances des langages, frameworks, outils et environnements de développement.'),
(2, 'Méthodes et pratiques du développement', 'Un thème large englobant les approches de travail, les bonnes pratiques, la gestion de projet, la qualité du code, la performance et la productivité des développeurs.'),
(3, 'Innovation et tendances du numérique', 'Un espace pour les sujets émergents : intelligence artificielle, cloud computing, cybersécurité, open source, et toutes les innovations qui transforment le monde du développement et de la tech.');

-- Insertion des utilisateurs avec le mot de passe "password" (hashé avec BCrypt)
-- Le hash BCrypt pour "password" est : $2a$12$jBSRhPf70QnLTyHT3PRZYOQyG8.PtD2PjWaEYFveysl8CPE7UTtWm
INSERT INTO app_user (id, email, username, password) VALUES
(1, 'test@test.com', 'Jean-Baptiste', '$2a$12$jBSRhPf70QnLTyHT3PRZYOQyG8.PtD2PjWaEYFveysl8CPE7UTtWm'),
(2, 'sarah.chen@tech.io', 'SarahChen', '$2a$12$jBSRhPf70QnLTyHT3PRZYOQyG8.PtD2PjWaEYFveysl8CPE7UTtWm'),
(3, 'marc.dubois@code.fr', 'MarcDubois', '$2a$12$jBSRhPf70QnLTyHT3PRZYOQyG8.PtD2PjWaEYFveysl8CPE7UTtWm'),
(4, 'lisa.rodriguez@dev.com', 'LisaRodriguez', '$2a$12$jBSRhPf70QnLTyHT3PRZYOQyG8.PtD2PjWaEYFveysl8CPE7UTtWm'),
(5, 'thomas.leclerc@tech.io', 'ThomasLeclerc', '$2a$12$jBSRhPf70QnLTyHT3PRZYOQyG8.PtD2PjWaEYFveysl8CPE7UTtWm'),
(6, 'marie.bernard@code.fr', 'MarieBernard', '$2a$12$jBSRhPf70QnLTyHT3PRZYOQyG8.PtD2PjWaEYFveysl8CPE7UTtWm'),
(7, 'pierre.moreau@dev.com', 'PierreMoreau', '$2a$12$jBSRhPf70QnLTyHT3PRZYOQyG8.PtD2PjWaEYFveysl8CPE7UTtWm'),
(8, 'julie.petit@tech.io', 'JuliePetit', '$2a$12$jBSRhPf70QnLTyHT3PRZYOQyG8.PtD2PjWaEYFveysl8CPE7UTtWm');

-- Abonnements aux thèmes
INSERT INTO user_theme (user_id, theme_id) VALUES
-- Alex Martin s'abonne aux 3 thèmes
(1, 1), (1, 2), (1, 3),
-- Sarah Chen s'abonne aux thèmes 1 et 3
(2, 1), (2, 3),
-- Marc Dubois s'abonne aux thèmes 1 et 2
(3, 1), (3, 2),
-- Lisa Rodriguez s'abonne aux 3 thèmes
(4, 1), (4, 2), (4, 3),
-- Thomas Leclerc s'abonne aux thèmes 2 et 3
(5, 2), (5, 3),
-- Marie Bernard s'abonne aux 3 thèmes
(6, 1), (6, 2), (6, 3),
-- Pierre Moreau s'abonne aux thèmes 1 et 2
(7, 1), (7, 2),
-- Julie Petit s'abonne aux thèmes 1 et 3
(8, 1), (8, 3);

-- Articles sur les différents thèmes
INSERT INTO article (id, title, content, created_at, user_id, theme_id) VALUES
-- Articles sur le thème 1 (Technologies et langages)
(1, 'Angular 20 : Les nouvelles fonctionnalités révolutionnaires', 'Angular 20 apporte des améliorations significatives avec les nouveaux Angular Signals, une meilleure performance et une API simplifiée. Dans cet article, nous explorons les principales nouveautés et comment migrer votre application existante.', '2025-10-20 09:15:30.000000', 1, 1),
(2, 'Spring Boot 3.5 : Optimisations et nouvelles fonctionnalités', 'Spring Boot 3.5 continue d\'évoluer avec des améliorations de performance, une meilleure intégration avec les modules Java et de nouvelles fonctionnalités de sécurité. Découvrez comment tirer parti de ces améliorations.', '2025-10-21 14:22:15.000000', 2, 1),
(3, 'TypeScript 5.8 : Améliorations du système de types', 'TypeScript 5.8 introduit de nouvelles fonctionnalités pour améliorer l\'inférence de types et la sécurité. Nous analysons les changements les plus importants pour les développeurs.', '2025-10-22 11:45:20.000000', 3, 1),
(4, 'React vs Vue vs Angular : Comparaison 2025', 'Une analyse approfondie des trois frameworks frontend les plus populaires en 2025, leurs forces, faiblesses et cas d\'usage recommandés.', '2025-10-23 16:30:45.000000', 4, 1),

-- Articles sur le thème 2 (Méthodes et pratiques)
(5, 'Clean Architecture : Principes et mise en œuvre', 'La Clean Architecture permet de créer des applications maintenables et testables. Nous explorons les principes fondamentaux et comment les appliquer dans vos projets.', '2025-10-19 10:20:30.000000', 5, 2),
(6, 'TDD : Test-Driven Development en pratique', 'Le développement piloté par les tests est une approche qui améliore la qualité du code. Découvrez comment intégrer le TDD dans votre workflow de développement.', '2025-10-20 13:15:20.000000', 6, 2),
(7, 'Code Review : Bonnes pratiques pour une équipe efficace', 'Les code reviews sont essentiels pour maintenir la qualité du code. Voici les meilleures pratiques pour organiser des reviews efficaces dans votre équipe.', '2025-10-21 09:30:15.000000', 7, 2),
(8, 'Git Flow : Stratégie de gestion des branches', 'Git Flow est une stratégie de gestion des branches qui facilite la collaboration en équipe. Apprenez à l\'implémenter dans vos projets.', '2025-10-22 15:45:30.000000', 8, 2),

-- Articles sur le thème 3 (Innovation et tendances)
(9, 'IA Générative : Impact sur le développement logiciel', 'L\'intelligence artificielle générative transforme la façon dont nous développons des logiciels. Explorons les outils et les implications pour les développeurs.', '2025-10-18 12:00:00.000000', 1, 3),
(10, 'Cloud Native : Architecture moderne des applications', 'Les applications cloud native sont conçues pour tirer parti des avantages du cloud. Découvrez les principes et technologies clés.', '2025-10-19 14:30:45.000000', 2, 3),
(11, 'Cybersécurité : Bonnes pratiques pour les développeurs', 'La sécurité doit être intégrée dès la conception des applications. Voici les bonnes pratiques essentielles que tout développeur doit connaître.', '2025-10-20 11:15:30.000000', 3, 3),
(12, 'Web3 et Blockchain : Nouvelles opportunités', 'Le Web3 et la blockchain ouvrent de nouvelles possibilités pour les développeurs. Explorons les technologies émergentes et leurs cas d\'usage.', '2025-10-21 16:20:15.000000', 4, 3);

-- Commentaires sur les articles
INSERT INTO comment (id, content, created_at, article_id, user_id) VALUES
-- Commentaires sur l'article Angular 20
(1, 'Excellent article ! Les Angular Signals sont vraiment révolutionnaires pour la gestion d\'état.', '2025-10-20 10:30:15.000000', 1, 2),
(2, 'Merci pour ce partage. J\'ai hâte de tester ces nouvelles fonctionnalités dans mon projet.', '2025-10-20 11:45:30.000000', 1, 3),
(3, 'Très utile pour la migration. Avez-vous des conseils spécifiques pour les grandes applications ?', '2025-10-20 14:20:45.000000', 1, 4),

-- Commentaires sur l'article Spring Boot 3.5
(4, 'Spring Boot continue d\'impressionner avec ses améliorations de performance.', '2025-10-21 15:30:20.000000', 2, 1),
(5, 'Les nouvelles fonctionnalités de sécurité sont particulièrement intéressantes.', '2025-10-21 16:15:45.000000', 2, 3),
(6, 'Parfait timing pour notre migration vers Spring Boot 3.5 !', '2025-10-21 17:00:30.000000', 2, 5),

-- Commentaires sur l'article TypeScript 5.8
(7, 'L\'amélioration de l\'inférence de types va nous faire gagner beaucoup de temps.', '2025-10-22 12:30:15.000000', 3, 1),
(8, 'TypeScript ne cesse de s\'améliorer. C\'est devenu indispensable pour nos projets.', '2025-10-22 13:45:30.000000', 3, 2),

-- Commentaires sur l'article Clean Architecture
(9, 'La Clean Architecture a vraiment transformé la façon dont nous structurons nos projets.', '2025-10-19 11:15:45.000000', 5, 1),
(10, 'Excellent guide pratique. Les exemples sont très clairs.', '2025-10-19 12:30:20.000000', 5, 6),
(11, 'Merci pour ces conseils. Nous allons les appliquer dans notre équipe.', '2025-10-19 14:45:15.000000', 5, 7),

-- Commentaires sur l'article TDD
(12, 'Le TDD demande de la discipline mais les bénéfices sont énormes.', '2025-10-20 14:00:30.000000', 6, 2),
(13, 'Très bon article sur une pratique essentielle du développement.', '2025-10-20 15:30:45.000000', 6, 4),
(14, 'Le TDD a révolutionné notre processus de développement.', '2025-10-20 16:15:20.000000', 6, 8),

-- Commentaires sur l'article IA Générative
(15, 'L\'IA générative va vraiment changer notre métier. Il faut s\'adapter !', '2025-10-18 13:30:45.000000', 9, 2),
(16, 'Fascinant de voir comment ces outils évoluent rapidement.', '2025-10-18 14:45:30.000000', 9, 3),
(17, 'Nous utilisons déjà ChatGPT pour le code. Les résultats sont impressionnants.', '2025-10-18 15:30:15.000000', 9, 5),

-- Commentaires sur l'article Cloud Native
(18, 'Le cloud native est devenu un standard pour les nouvelles applications.', '2025-10-19 15:45:20.000000', 10, 1),
(19, 'Très bon aperçu des technologies cloud native.', '2025-10-19 16:30:45.000000', 10, 4),
(20, 'Kubernetes et Docker sont devenus indispensables.', '2025-10-19 17:15:30.000000', 10, 6),

-- Commentaires sur l'article Cybersécurité
(21, 'La sécurité doit être une priorité dès le début du développement.', '2025-10-20 12:15:45.000000', 11, 1),
(22, 'Excellent rappel des bonnes pratiques de sécurité.', '2025-10-20 13:30:20.000000', 11, 2),
(23, 'Nous avons récemment eu un audit de sécurité. Ces conseils sont précieux.', '2025-10-20 14:45:15.000000', 11, 7),

-- Commentaires sur l'article Web3
(24, 'Le Web3 ouvre de nouvelles perspectives fascinantes.', '2025-10-21 17:30:45.000000', 12, 1),
(25, 'Très intéressant de voir l\'évolution des technologies blockchain.', '2025-10-21 18:15:30.000000', 12, 3),
(26, 'Nous explorons les smart contracts pour notre prochain projet.', '2025-10-21 19:00:15.000000', 12, 5);

-- Mise à jour des AUTO_INCREMENT
ALTER TABLE app_user AUTO_INCREMENT = 9;
ALTER TABLE article AUTO_INCREMENT = 13;
ALTER TABLE comment AUTO_INCREMENT = 27;