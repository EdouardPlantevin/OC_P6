-- Script d'initialisation de la base de données
-- Ce fichier peut être utilisé pour initialiser la base de données avec des données de test
-- ATTENTION: Les mots de passe doivent être hashés avec BCrypt

-- Insertion d'un utilisateur de test (mot de passe: password123)
-- Login: test@example.com / password123
INSERT INTO app_user (email, password, username) 
VALUES ('test@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'user_test')
ON DUPLICATE KEY UPDATE email=VALUES(email);

-- Note: Le mot de passe 'password123' correspond au hash ci-dessus
-- Pour créer un nouveau hash, visitez: https://bcrypt-generator.com/
-- Ou utilisez l'endpoint de registration de l'API pour créer de nouveaux utilisateurs

