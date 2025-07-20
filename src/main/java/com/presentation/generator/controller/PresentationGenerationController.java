package com.presentation.generator.controller;

import com.presentation.generator.entity.BriefRequest;
import com.presentation.generator.entity.SlideContent;
import com.presentation.generator.service.GeminiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/presentations")
public class PresentationGenerationController {

    @Autowired
    private GeminiService geminiService;

    @PostMapping("/generate-structure")
    public ResponseEntity<List<SlideContent>> generateStructure(@RequestBody BriefRequest request) {
        List<SlideContent> slides = geminiService.generateSlides(
                request.getSubject(),
                request.getAudience(),
                request.getDuration(),
                request.getGoal()
        );
        return ResponseEntity.ok(slides);
    }
}
