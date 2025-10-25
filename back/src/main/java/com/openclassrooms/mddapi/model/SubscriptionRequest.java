package com.openclassrooms.mddapi.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record SubscriptionRequest(
        @NotNull
        @Positive
        Long themeId
) {
}
