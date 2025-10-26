package com.openclassrooms.mddapi.mapper;

import com.openclassrooms.mddapi.entity.Theme;
import com.openclassrooms.mddapi.model.ThemeDto;
import com.openclassrooms.mddapi.model.ThemeResponse;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ThemeMapper {
    public ThemeResponse toDto(Theme theme, List<Long> subscriptions) {
        return new ThemeResponse(
                theme.getId(),
                theme.getTitle(),
                theme.getDescription(),
                subscriptions.contains(theme.getId())
        );
    }
}
