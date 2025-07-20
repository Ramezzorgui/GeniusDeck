package com.presentation.generator.payload.response;

import java.time.LocalDateTime;

public class PresentationResponse {
    private Long id;
    private String title;
    private String content;
    private Long userId;
    private String userName;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Constructeur
    public PresentationResponse(Long id, String title, String content, Long userId, String userName, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.userId = userId;
        this.userName = userName;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Getters (les setters ne sont généralement pas nécessaires pour les DTOs de réponse)
    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getContent() { return content; }
    public Long getUserId() { return userId; }
    public String getUserName() { return userName; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}
