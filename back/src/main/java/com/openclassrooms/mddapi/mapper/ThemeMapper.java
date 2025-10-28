package com.openclassrooms.mddapi.mapper;

import com.openclassrooms.mddapi.entity.Theme;
import com.openclassrooms.mddapi.model.ThemeResponse;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Mapper for converting between Theme entity and ThemeResponse.
 * Handles the mapping of theme information including subscription status.
 */
@Component
public class ThemeMapper {
    
    /**
     * Converts a Theme entity to a ThemeResponse.
     *
     * @param theme the theme entity to convert
     * @param subscriptions the list of subscribed theme IDs
     * @return the corresponding ThemeResponse with subscription status
     */
    public ThemeResponse toDto(Theme theme, List<Long> subscriptions) {
        return new ThemeResponse(
                theme.getId(),
                theme.getTitle(),
                theme.getDescription(),
                subscriptions.contains(theme.getId())
        );
    }
}
