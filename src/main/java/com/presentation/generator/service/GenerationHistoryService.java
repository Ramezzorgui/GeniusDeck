package com.presentation.generator.service;

import com.presentation.generator.entity.GenerationHistory;
import com.presentation.generator.repository.GenerationHistoryRepository;
import com.presentation.generator.repository.PresentationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GenerationHistoryService {

    private final GenerationHistoryRepository generationHistoryRepository;
    private final PresentationRepository presentationRepository;

    @Autowired
    public GenerationHistoryService(GenerationHistoryRepository generationHistoryRepository, PresentationRepository presentationRepository) {
        this.generationHistoryRepository = generationHistoryRepository;
        this.presentationRepository = presentationRepository;
    }

    // ✅ GET All
    public List<GenerationHistory> getAll() {
        return generationHistoryRepository.findAll();
    }

    // ✅ GET by ID
    public Optional<GenerationHistory> getById(Long id) {
        return generationHistoryRepository.findById(id);
    }

    // ✅ CREATE
    public Optional<GenerationHistory> create(GenerationHistory history) {
        if (history.getPresentation() != null && history.getPresentation().getId() != null) {
            boolean presentationExists = presentationRepository.existsById(history.getPresentation().getId());
            if (!presentationExists) {
                return Optional.empty(); // or throw custom exception
            }
        }
        GenerationHistory saved = generationHistoryRepository.save(history);
        return Optional.of(saved);
    }

    // ✅ UPDATE
    public Optional<GenerationHistory> update(Long id, GenerationHistory updatedHistory) {
        Optional<GenerationHistory> existing = generationHistoryRepository.findById(id);
        if (existing.isEmpty()) {
            return Optional.empty();
        }

        GenerationHistory history = existing.get();
        history.setPrompt(updatedHistory.getPrompt());
        history.setResponse(updatedHistory.getResponse());
        history.setTokensUsed(updatedHistory.getTokensUsed());
        history.setPresentation(updatedHistory.getPresentation());
        history.setCreatedAt(updatedHistory.getCreatedAt());

        return Optional.of(generationHistoryRepository.save(history));
    }

    // ✅ DELETE
    public boolean delete(Long id) {
        if (!generationHistoryRepository.existsById(id)) {
            return false;
        }
        generationHistoryRepository.deleteById(id);
        return true;
    }
}
