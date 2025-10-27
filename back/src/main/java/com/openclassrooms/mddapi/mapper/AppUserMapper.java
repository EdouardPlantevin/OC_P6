package com.openclassrooms.mddapi.mapper;

import com.openclassrooms.mddapi.entity.AppUser;
import com.openclassrooms.mddapi.model.AppUserDto;
import org.springframework.stereotype.Component;

/**
 * Mapper for converting between AppUser entity and AppUserDto.
 * Handles the mapping of user information.
 */
@Component
public class AppUserMapper {

    /**
     * Converts an AppUser entity to an AppUserDto.
     *
     * @param appUser the user entity to convert
     * @return the corresponding AppUserDto
     */
    public AppUserDto toDto(AppUser appUser) {
        return new AppUserDto(
                appUser.getId(),
                appUser.getEmail(),
                appUser.getUsername()
        );
    }
}
