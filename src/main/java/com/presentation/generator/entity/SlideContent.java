package com.presentation.generator.entity;

public class SlideContent {
    private String title;
    private String content;

    public SlideContent() {}

    public SlideContent(String title, String content) {
        this.title = title;
        this.content = content;
    }

    // Getters / Setters
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
}
