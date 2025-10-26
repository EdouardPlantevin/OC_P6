package com.openclassrooms.mddapi.mapper;

import com.openclassrooms.mddapi.entity.AppUser;
import com.openclassrooms.mddapi.model.AppUserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AppUserMapper {

    private final ThemeMapper themeMapper;

    public AppUserDto toDto(AppUser appUser) {
        return new AppUserDto(
                appUser.getId(),
                appUser.getEmail(),
                appUser.getUsername()
        );
    }
}
