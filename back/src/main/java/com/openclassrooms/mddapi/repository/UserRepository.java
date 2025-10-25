package com.openclassrooms.mddapi.repository;

import aj.org.objectweb.asm.commons.Remapper;
import com.openclassrooms.mddapi.entity.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<AppUser, Long> {
    Optional<AppUser> findOneByUsernameIgnoreCase(String username);

    Optional<AppUser> findByEmail(String email);

    Optional<AppUser> findByUsername(String username);
}
