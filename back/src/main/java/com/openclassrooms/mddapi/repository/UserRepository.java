package com.openclassrooms.mddapi.repository;

import com.openclassrooms.mddapi.entity.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<AppUser, Long> {

    @Query("SELECT u FROM AppUser u WHERE u.email = :login OR u.username = :login")
    Optional<AppUser> findByLogin(@Param("login") String login);

    Optional<AppUser> findByEmail(String email);

    Optional<AppUser> findByUsername(String username);
}
