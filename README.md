# P6 - Réseau Social de Développeurs

Application full-stack de réseau social pour développeurs développée avec Spring Boot (back-end) et Angular (front-end).

## 📋 Prérequis

- **Java 17**
- **Node.js 14+** et **npm**
- **MySQL 8.0+**
- **Git**

## 🚀 Installation

### 1. Configuration du Back-end

```bash
cd back
cp env.example .env
```

Éditez le fichier `.env` avec vos paramètres MySQL et générez une clé JWT :

```bash
openssl rand -base64 64
```

Exemple de `.env` :
```env
DB_URL=jdbc:mysql://localhost:3306/mdd_db?createDatabaseIfNotExist=true
DB_USERNAME=root
DB_PASSWORD=votre_mot_de_passe
JWT_SECOND=86400
JWT_BASE64_SECRET=votre_clé_générée
```

### 2. Démarrer le Back-end

```bash
./mvnw spring-boot:run
```

Le serveur démarre sur `http://localhost:8080`. La base de données et les tables sont créées automatiquement par Hibernate.

### 3. Initialiser les données de tests

Vous trouverez un script de avec des données de test dans: 

```bash
back/src/main/resources/fixture.sql
```

Un utilisateur de test sera créé :
- Email : `test@test.com`
- Mot de passe : `password`
- Username : `Jean-Baptiste`

### 4. Démarrer le Front-end

Dans un nouveau terminal :

```bash
cd front
npm install
npm start
```

L'application est accessible sur `http://localhost:4200`

## 🎯 Accès

- **Front-end** : http://localhost:4200
- **Back-end** : http://localhost:8080
- **Swagger UI** : http://localhost:8080/swagger-ui/index.html
- **Compte test** : test@example.com / password123




## 📚 Technologies

- **Back-end** : Spring Boot 3.5.6, Java 17, Spring Security, JWT, JPA/Hibernate, MySQL
- **Front-end** : Angular 20, Angular Material, TypeScript
