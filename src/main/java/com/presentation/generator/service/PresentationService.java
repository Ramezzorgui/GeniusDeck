package com.presentation.generator.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.presentation.generator.dto.SlideData;
import com.presentation.generator.entity.*;
import com.presentation.generator.repository.PresentationRepository;
import com.presentation.generator.repository.SlideRepository;
import com.presentation.generator.repository.TemplateRepository;
import com.presentation.generator.repository.UserRepository;
import com.presentation.generator.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import com.presentation.generator.payload.request.PresentationRequest;
import com.presentation.generator.payload.response.PresentationResponse;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PresentationService {

    @Autowired
    private PresentationRepository presentationRepository;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;
    @Autowired
    private AIService aiService;
    @Autowired
    private SlideRepository slideRepository;
    @Autowired
    private SlideService slideService;
    @Autowired
    private TemplateRepository templateRepository;
    @Autowired
    private GenerationHistoryService generationHistoryService;



    public List<Presentation> getAllPresentations() {
        return presentationRepository.findAll();
    }


    public Presentation createPresentation(Presentation presentation) {
        return presentationRepository.save(presentation);
    }

    public Presentation updatePresentation(Long id, Presentation presentationDetails) {
        Presentation presentation = presentationRepository.findById(id).orElseThrow();

        presentation.setTitle(presentationDetails.getTitle());
        presentation.setDescription(presentationDetails.getDescription());
        presentation.setContent(presentationDetails.getContent());
        presentation.setSettings(presentationDetails.getSettings());
        presentation.setUpdatedAt(java.time.LocalDateTime.now());
        presentation.setTemplate(presentationDetails.getTemplate());
        presentation.setUser(presentationDetails.getUser());

        return presentationRepository.save(presentation);
    }


    private Long getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated() || "anonymousUser".equals(authentication.getPrincipal())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Utilisateur non authentifié.");
        }
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        return userDetails.getId();
    }
    private PresentationResponse convertToDto(Presentation presentation) {
        // Note : Votre entité n'a pas de `description` ou `settings`, j'ai donc retiré ces champs.
        // J'ai ajouté `userName` pour un affichage plus facile côté client.
        return new PresentationResponse(
                presentation.getId(),
                presentation.getTitle(),
                presentation.getContent(),
                presentation.getUser().getId(),
                presentation.getUser().getName(),
                presentation.getCreatedAt(),
                presentation.getUpdatedAt()
        );
    }
    public PresentationResponse createPresentation(PresentationRequest presentationRequest) {
        Long userId = getCurrentUserId();
        User currentUser = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Utilisateur non trouvé."));

        Presentation presentation = new Presentation();
        presentation.setTitle(presentationRequest.getTitle());
        presentation.setContent(presentationRequest.getContent());
        presentation.setUser(currentUser); // Associe la présentation à l'utilisateur connecté
        presentation.setCreatedAt(LocalDateTime.now());

        Presentation savedPresentation = presentationRepository.save(presentation);
        return convertToDto(savedPresentation);
    }

    public List<PresentationResponse> getAllPresentationsForCurrentUser() {
        Long userId = getCurrentUserId();
        List<Presentation> presentations = presentationRepository.findByUserId(userId);
        return presentations.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    public PresentationResponse getPresentationById(Long id) {
        Long userId = getCurrentUserId();
        Presentation presentation = presentationRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Présentation non trouvée ou non accessible."));
        return convertToDto(presentation);
    }
    public PresentationResponse updatePresentation(Long id, PresentationRequest presentationRequest) {
        Long userId = getCurrentUserId();
        Presentation presentation = presentationRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Présentation non trouvée ou non accessible."));

        presentation.setTitle(presentationRequest.getTitle());
        presentation.setContent(presentationRequest.getContent());
        presentation.setUpdatedAt(LocalDateTime.now());
        // On ne modifie ni l'utilisateur, ni le template ici (cela pourrait être une autre fonctionnalité)

        Presentation updatedPresentation = presentationRepository.save(presentation);
        return convertToDto(updatedPresentation);
    }

    public void deletePresentation(Long id) {
        Long userId = getCurrentUserId();
        // Vérifie que la présentation existe et appartient à l'utilisateur avant de la supprimer.
        if (!presentationRepository.existsByIdAndUserId(id, userId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Présentation non trouvée ou non accessible pour la suppression.");
        }
        presentationRepository.deleteById(id);
    }

    public List<Presentation> getPresentationsByUserEmail(String email) {
        User user = userService.getByEmail(email);
        return presentationRepository.findByUserId(user.getId());
    }

    public Presentation generatePresentation(String title, String content, String description) {
        // 1. Créer la présentation principale
        Presentation presentation = new Presentation();
        presentation.setTitle(title);
        presentation.setDescription(description);
        presentation.setCreatedAt(LocalDateTime.now());
        presentation.setUpdatedAt(LocalDateTime.now());
        // presentation.setUserId(userId); // Si vous avez l'authentification

        // 2. Sauvegarder la présentation d'abord pour obtenir l'ID
        presentation = presentationRepository.save(presentation);

        // 3. Générer les slides via AIService
        List<SlideData> generatedSlides = aiService.generateSlidesContent(title, content);

        // 4. Créer et sauvegarder chaque slide avec votre entité existante
        List<Slide> slides = new ArrayList<>();
        for (int i = 0; i < generatedSlides.size(); i++) {
            Slide slide = new Slide();
            slide.setPresentation(presentation); // ✅ Utiliser la relation JPA
            slide.setPosition(i + 1); // ✅ Position numérotée (1, 2, 3...)
            slide.setTitle(generatedSlides.get(i).getTitle());
            slide.setContent(generatedSlides.get(i).getContent());
            slide.setLayout(aiService.determineLayout(generatedSlides.get(i))); // ✅ Layout défini

            // Utiliser votre service Slide existant pour sauvegarder
            Slide savedSlide = slideService.save(slide);
            slides.add(savedSlide);
        }

        // 5. Associer les slides à la présentation
        presentation.setSlides(slides);
        return presentation;
    }

    /*public Presentation generateFromBrief(BriefRequest brief) {
        // 1. Simuler l'appel IA
        String fullText = brief.getGoal() + "\n" + brief.getKeyPoints();
        List<SlideData> slides = aiService.generateSlidesContent(brief.getSubject(), fullText);

        // 2. Mapper les slides en JSON string
        ObjectMapper mapper = new ObjectMapper();
        String contentJson;
        try {
            contentJson = mapper.writeValueAsString(slides);
        } catch (Exception e) {
            throw new RuntimeException("Erreur lors de la conversion des slides en JSON", e);
        }

        // 3. Créer l'objet Presentation
        Presentation p = new Presentation();
        p.setTitle(brief.getSubject());
        p.setDescription(brief.getGoal());
        p.setCreatedAt(LocalDateTime.now());
        p.setUpdatedAt(LocalDateTime.now());
        p.setContent(contentJson); // ✅ Corrigé ici

        // 4. Sauvegarder
        presentationRepository.save(p);

        return p;
    }*/

    public Presentation generateFromBrief(BriefRequest brief) {
        // 1. Génération du contenu via IA
        String fullText = brief.getGoal() + "\n" + brief.getKeyPoints();
        List<SlideData> slides = aiService.generateSlidesContent(brief.getSubject(), fullText);

        // 2. Conversion en JSON
        ObjectMapper mapper = new ObjectMapper();
        String contentJson;
        try {
            contentJson = mapper.writeValueAsString(slides);
        } catch (Exception e) {
            throw new RuntimeException("Erreur lors de la conversion des slides en JSON", e);
        }

        // 3. Création de la présentation
        Presentation p = new Presentation();
        p.setTitle(brief.getSubject());
        p.setDescription(brief.getGoal());
        p.setCreatedAt(LocalDateTime.now());
        p.setUpdatedAt(LocalDateTime.now());
        p.setContent(contentJson);

        // Appliquer template si présente
        if (brief.getTemplateId() != null) {
            Template template = templateRepository.findById(brief.getTemplateId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Template non trouvée"));
            p.setTemplate(template);
        }

        // Associer utilisateur connecté
        Long userId = getCurrentUserId();
        User currentUser = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Utilisateur non trouvé"));
        p.setUser(currentUser);

        // 4. Sauvegarder la présentation
        Presentation savedPresentation = presentationRepository.save(p);

        // 5. Enregistrer l’historique de génération
        GenerationHistory history = new GenerationHistory();
        history.setPresentation(savedPresentation);
        history.setPrompt(brief.getSubject() + " | " + brief.getGoal());
        history.setResponse(contentJson); // ou le texte brut de la réponse AI si tu le préfères
        history.setTokensUsed(0); // si tu as ce chiffre, sinon 0 ou null
        history.setCreatedAt(LocalDateTime.now());

        generationHistoryService.create(history);

        // 6. Retourner la présentation sauvegardée
        return savedPresentation;
    }


}
