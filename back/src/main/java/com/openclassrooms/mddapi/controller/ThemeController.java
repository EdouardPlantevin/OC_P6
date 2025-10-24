package com.openclassrooms.mddapi.controller;


import com.openclassrooms.mddapi.model.ThemeDto;
import com.openclassrooms.mddapi.service.ThemeService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Tag(name = "Theme")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/themes")
public class ThemeController {

    private final ThemeService themeService;

    @GetMapping()
    public List<ThemeDto> findAll() {
        return themeService.findAll();
    }
}
