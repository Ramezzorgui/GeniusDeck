package com.presentation.generator.service;

import com.presentation.generator.entity.Presentation;
import com.presentation.generator.entity.Slide;
import com.presentation.generator.entity.SlideContent;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
public class GeminiService {

    @Value("${gemini.api.url}")
    private String geminiApiUrl;

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public List<SlideContent> generateSlides(String subject, String audience, String duration, String objectif) {
        String prompt = buildPrompt(subject, audience, duration, objectif);
        String response = callGemini(prompt);
        return parseResponseToSlides(response);
    }

    public List<Slide> generateSlidesAsEntities(String subject, String audience, String duration, String objectif, Presentation presentation) {
        List<SlideContent> contents = generateSlides(subject, audience, duration, objectif);
        List<Slide> slides = new ArrayList<>();
        int position = 1;

        for (SlideContent sc : contents) {
            Slide slide = new Slide();
            slide.setPresentation(presentation);
            slide.setTitle(sc.getTitle());
            slide.setContent(sc.getContent());
            slide.setPosition(position++);
            slide.setLayout("default");
            slides.add(slide);
        }
        return slides;
    }

    private String buildPrompt(String subject, String audience, String duration, String objectif) {
        return String.format("""
                Génère une présentation structurée en JSON sous ce format :
                [
                  { "title": "Titre de la slide", "content": "Contenu détaillé de la slide" },
                  ...
                ]
                Sujet : %s
                Audience : %s
                Durée : %s
                Objectif : %s
                """, subject, audience, duration, objectif);
    }

    private String callGemini(String prompt) {
        System.out.println("Using Gemini API URL: " + geminiApiUrl);  // <--- ici

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Pas de BearerAuth ici car ce n'est pas un token OAuth
        // Passer la clé API dans l'URL
        String url = geminiApiUrl + "?key=" + geminiApiKey;

        String requestBody = """
{
  "contents": [{
    "parts":[{
      "text": "%s"
    }]
  }],
  "generationConfig": {
    "temperature": 0.7,
    "topP": 0.8,
    "topK": 40,
    "candidateCount": 1
  }
}
""".formatted(prompt.replace("\"", "\\\""));

        HttpEntity<String> request = new HttpEntity<>(requestBody, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);
        if (response.getStatusCode() == HttpStatus.OK) {
            return response.getBody();
        } else {
            throw new RuntimeException("Erreur API Gemini : " + response.getStatusCode() + " - " + response.getBody());
        }
    }


    private List<SlideContent> parseResponseToSlides(String jsonResponse) {
        List<SlideContent> slides = new ArrayList<>();

        try {
            JsonNode root = objectMapper.readTree(jsonResponse);
            String content = root.at("/candidates/0/content/parts/0/text").asText(); // Chemin correct pour Gemini

            // Extraire uniquement le tableau JSON (le plus souvent Gemini inclut du texte avant/après)
            int startIndex = content.indexOf('[');
            int endIndex = content.lastIndexOf(']');
            if (startIndex == -1 || endIndex == -1) {
                throw new RuntimeException("Le JSON attendu n'a pas été trouvé dans le texte.");
            }

            String jsonArray = content.substring(startIndex, endIndex + 1);

            // On parse maintenant le tableau JSON extrait
            JsonNode parsedSlides = objectMapper.readTree(jsonArray);

            for (JsonNode node : parsedSlides) {
                String title = node.get("title").asText();
                String slideContent = node.get("content").asText();
                slides.add(new SlideContent(title, slideContent));
            }

        } catch (Exception e) {
            throw new RuntimeException("Erreur parsing réponse Gemini : " + e.getMessage(), e);
        }

        return slides;
    }

}
