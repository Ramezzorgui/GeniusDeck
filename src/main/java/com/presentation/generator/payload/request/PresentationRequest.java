package com.presentation.generator.payload.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

// Pas besoin de @Data de Lombok si vous n'utilisez pas Lombok
public class PresentationRequest {
    @NotBlank(message = "Le titre ne peut pas être vide")
    @Size(max = 255, message = "Le titre ne peut pas dépasser 255 caractères")
    private String title;
    private String description;


    private String content;

    // Getters et Setters manuels
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
