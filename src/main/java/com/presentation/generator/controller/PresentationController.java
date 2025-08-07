package com.presentation.generator.controller;

import com.presentation.generator.entity.BriefRequest;
import com.presentation.generator.entity.Presentation;
import com.presentation.generator.payload.request.PresentationRequest;
import com.presentation.generator.payload.response.PresentationResponse;
import com.presentation.generator.repository.PresentationRepository;
import com.presentation.generator.service.PresentationService;
import com.presentation.generator.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/presentations")
@PreAuthorize("isAuthenticated()")
public class PresentationController {

    @Autowired
    private PresentationService presentationService;
    @Autowired
    private UserService userService;
    @Autowired
    private PresentationRepository presentationRepository;

    // Endpoint pour générer une présentation avec l'IA
    @PostMapping("/generate")
    public ResponseEntity<Presentation> generatePresentation(
            @RequestBody PresentationRequest request) {

        try {
            // Générer la présentation avec tous les champs correctement remplis
            Presentation presentation = presentationService
                    .generatePresentation(
                            request.getTitle(),
                            request.getContent(),
                            request.getDescription()
                    );

            return ResponseEntity.status(HttpStatus.CREATED).body(presentation);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    // L'ancien endpoint createPresentation est conservé pour la création de présentations vides si nécessaire
    @PostMapping
    public ResponseEntity<PresentationResponse> createPresentation(@Valid @RequestBody PresentationRequest presentationRequest) {
        PresentationResponse newPresentation = presentationService.createPresentation(presentationRequest);
        return new ResponseEntity<>(newPresentation, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<PresentationResponse>> getAllPresentationsForCurrentUser() {
        List<PresentationResponse> presentations = presentationService.getAllPresentationsForCurrentUser();
        return ResponseEntity.ok(presentations);
    }


    @GetMapping("/{id}")
    public ResponseEntity<PresentationResponse> getPresentationById(@PathVariable Long id) {
        PresentationResponse presentation = presentationService.getPresentationById(id);
        return ResponseEntity.ok(presentation);
    }


    @PutMapping("/{id}")
    public ResponseEntity<PresentationResponse> updatePresentation(@PathVariable Long id, @Valid @RequestBody PresentationRequest presentationRequest) {
        PresentationResponse updatedPresentation = presentationService.updatePresentation(id, presentationRequest);
        return ResponseEntity.ok(updatedPresentation);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePresentation(@PathVariable Long id) {
        presentationService.deletePresentation(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/me")
    public List<Presentation> getMyPresentations(Authentication auth) {
        return presentationService.getPresentationsByUserEmail(auth.getName());
    }

    @PostMapping("/structure")
    public ResponseEntity<Presentation> generateStructure(@RequestBody BriefRequest brief) {
        Presentation presentation = presentationService.generateFromBrief(brief);
        return ResponseEntity.ok(presentation);
    }

    @PostMapping("/from-brief")
    public ResponseEntity<Presentation> generateFromBrief(@RequestBody BriefRequest brief) {
        try {
            Presentation presentation = presentationService.generateFromBrief(brief);
            return ResponseEntity.ok(presentation);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/count")
    public Map<String, Long> getPresentationsCount() {
        long count = presentationRepository.count();
        return Collections.singletonMap("count", count);
    }



}
