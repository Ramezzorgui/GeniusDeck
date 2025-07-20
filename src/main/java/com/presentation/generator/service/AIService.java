package com.presentation.generator.service;

import com.presentation.generator.dto.SlideData;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class AIService {

    /**
     * Génère le contenu des slides pour une présentation.
     */
    public List<SlideData> generateSlidesContent(String title, String content) {
        List<SlideData> slides = new ArrayList<>();

        // Slide 1 - Introduction
        String slide1Content = "Bienvenue à notre présentation sur " + title + ". " +
                content.substring(0, Math.min(content.length(), 100)) + "...";
        slides.add(new SlideData("Introduction à " + title, slide1Content));

        // Slide 2 - Développement
        String slide2Content = "Exploration des idées principales et des définitions. " +
                (content.length() > 100 ?
                        content.substring(100, Math.min(content.length(), 200)) + "..." :
                        "Concepts et définitions importantes.");
        slides.add(new SlideData("Concepts Clés", slide2Content));

        // Slide 3 - Applications
        String slide3Content = "Exemples concrets et applications pratiques de " + title +
                " dans différents domaines.";
        slides.add(new SlideData("Applications Pratiques", slide3Content));

        // Slide 4 - Conclusion
        String slide4Content = "Résumé des points importants et perspectives d'avenir pour " + title + ".";
        slides.add(new SlideData("Conclusion", slide4Content));

        return slides;
    }

    /**
     * Détermine le layout approprié selon le contenu du slide.
     */
    public String determineLayout(SlideData slideData) {
        String title = slideData.getTitle().toLowerCase();
        String content = slideData.getContent().toLowerCase();

        if (title.contains("introduction")) {
            return "title_content";
        } else if (title.contains("conclusion")) {
            return "title_content";
        } else if (content.contains("•") || content.contains("-") || content.contains("1.")) {
            return "bullet_points";
        } else if (title.contains("comparaison") || content.contains("vs")) {
            return "comparison";
        } else {
            return "content_only";
        }
    }
}
