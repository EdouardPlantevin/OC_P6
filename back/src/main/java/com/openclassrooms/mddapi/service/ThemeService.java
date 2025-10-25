package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.entity.AppUser;
import com.openclassrooms.mddapi.entity.Theme;
import com.openclassrooms.mddapi.mapper.ThemeMapper;
import com.openclassrooms.mddapi.model.ThemeDto;
import com.openclassrooms.mddapi.repository.ThemeRepository;
import com.openclassrooms.mddapi.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ThemeService {

    private final ThemeRepository themeRepository;
    private final ThemeMapper themeMapper;
    private final UserRepository userRepository;

    /**
     * Retrieves all the themes from the repository and converts them into a list of ThemeDto objects.
     *
     * @return a list of ThemeDto objects representing all the themes in the repository
     */
    public List<ThemeDto> findAll() {
        return themeRepository.findAll()
                .stream()
                .map(themeMapper::toDto)
                .toList();
    }


    /**
     * Toggles the subscription of the currently authenticated user to a specific theme.
     * If the user is already subscribed to the theme, the subscription is removed.
     * Otherwise, the user is subscribed to the theme.
     *
     * @param themeId the ID of the theme to be subscribed or unsubscribed
     * @param jwt the JWT of the currently authenticated user
     * @throws EntityNotFoundException if the user is not found by the username in the JWT or the theme does not exist
     */
    public void toggleSubscription(Long themeId, Jwt jwt) {
        AppUser appUser = userRepository.findByUsername(jwt.getSubject())
                .orElseThrow(() -> new EntityNotFoundException("Utilisateur non trouvé: email= " + jwt.getSubject()));

        Theme theme = themeRepository.findById(themeId)
                .orElseThrow(() -> new EntityNotFoundException("Thème non trouvé: id= " + themeId));

        if (appUser.getThemes().contains(theme)) {
            appUser.getThemes().remove(theme);
        } else {
            appUser.getThemes().add(theme);
        }

        themeRepository.save(theme);
    }

}
