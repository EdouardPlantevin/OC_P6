package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.entity.Theme;
import com.openclassrooms.mddapi.model.ThemeDto;
import org.springframework.stereotype.Component;

@Component
public class ThemeMapper {
    public ThemeDto toDto(Theme theme) {
        return new ThemeDto(
                theme.getId(),
                theme.getTitle(),
                theme.getDescription()
        );
    }
}
