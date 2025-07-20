package com.presentation.generator.controller;

import com.presentation.generator.entity.GenerationHistory;
import com.presentation.generator.repository.GenerationHistoryRepository;
import com.presentation.generator.repository.PresentationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/generationHistory")
public class GenerationHistoryController {

    @Autowired
    private GenerationHistoryRepository historyRepository;

    @Autowired
    private PresentationRepository presentationRepository;

    // ✅ GET All
    @GetMapping
    public List<GenerationHistory> getAll() {
        return historyRepository.findAll();
    }

    // ✅ GET by ID
    @GetMapping("/{id}")
    public ResponseEntity<GenerationHistory> getById(@PathVariable Long id) {
        Optional<GenerationHistory> history = historyRepository.findById(id);
        return history.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // ✅ POST
    @PostMapping
    public ResponseEntity<GenerationHistory> create(@RequestBody GenerationHistory history) {
        // Vérifie si la présentation liée existe
        if (history.getPresentation() != null && history.getPresentation().getId() != null) {
            if (!presentationRepository.existsById(history.getPresentation().getId())) {
                return ResponseEntity.badRequest().body(null);
            }
        }

        GenerationHistory saved = historyRepository.save(history);
        return ResponseEntity.ok(saved);
    }

    // ✅ PUT
    @PutMapping("/{id}")
    public ResponseEntity<GenerationHistory> update(@PathVariable Long id, @RequestBody GenerationHistory historyDetails) {
        Optional<GenerationHistory> optional = historyRepository.findById(id);
        if (optional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        GenerationHistory history = optional.get();
        history.setPrompt(historyDetails.getPrompt());
        history.setResponse(historyDetails.getResponse());
        history.setTokensUsed(historyDetails.getTokensUsed());
        history.setPresentation(historyDetails.getPresentation());
        history.setCreatedAt(historyDetails.getCreatedAt());

        GenerationHistory updated = historyRepository.save(history);
        return ResponseEntity.ok(updated);
    }

    // ✅ DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!historyRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        historyRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
