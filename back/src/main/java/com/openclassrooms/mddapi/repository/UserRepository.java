package com.openclassrooms.mddapi.repository;

import com.openclassrooms.mddapi.entity.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository interface for AppUser entity.
 * Provides data access operations for user entities.
 */
@Repository
public interface UserRepository extends JpaRepository<AppUser, Long> {

    /**
     * Finds a user by login (email or username).
     *
     * @param login the login identifier (email or username)
     * @return Optional containing the user if found
     */
    @Query("SELECT u FROM AppUser u WHERE u.email = :login OR u.username = :login")
    Optional<AppUser> findByLogin(@Param("login") String login);

    /**
     * Finds a user by email.
     *
     * @param email the user email
     * @return Optional containing the user if found
     */
    Optional<AppUser> findByEmail(String email);

    /**
     * Finds a user by username.
     *
     * @param username the user username
     * @return Optional containing the user if found
     */
    Optional<AppUser> findByUsername(String username);
}
