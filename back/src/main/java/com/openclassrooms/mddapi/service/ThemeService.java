package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.mapper.ThemeMapper;
import com.openclassrooms.mddapi.model.ThemeDto;
import com.openclassrooms.mddapi.repository.ThemeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ThemeService {

    private final ThemeRepository themeRepository;
    private final ThemeMapper themeMapper;

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

}
