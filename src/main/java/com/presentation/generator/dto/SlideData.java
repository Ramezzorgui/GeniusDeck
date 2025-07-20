package com.presentation.generator.dto;

public class SlideData {
    private String title;
    private String content;

    public SlideData() {}

    public SlideData(String title, String content) {
        this.title = title;
        this.content = content;
    }

    // Getters et Setters
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
}
