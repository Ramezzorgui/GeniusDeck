package com.presentation.generator.dto;

public class BriefRequest {
    private String title;
    private String duration;
    private String audience;
    private String objective;
    private String keyPoints;
    private Long templateId;

    // Getters et Setters
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }

    public String getDuration() {
        return duration;
    }
    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getAudience() {
        return audience;
    }
    public void setAudience(String audience) {
        this.audience = audience;
    }

    public String getObjective() {
        return objective;
    }
    public void setObjective(String objective) {
        this.objective = objective;
    }

    public String getKeyPoints() {
        return keyPoints;
    }
    public void setKeyPoints(String keyPoints) {
        this.keyPoints = keyPoints;
    }
    public Long getTemplateId() {
        return templateId;
    }
    public void setTemplateId(Long templateId) {
        this.templateId = templateId;
    }
}

