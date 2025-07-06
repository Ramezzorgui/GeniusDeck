package com.presentation.generator.service;

import com.presentation.generator.repository.GenerationHistoryRepository;
import org.springframework.stereotype.Service;

@Service
public class GenerationHistoryService {
    private final GenerationHistoryRepository generationHistoryRepository;

    public GenerationHistoryService(GenerationHistoryRepository generationHistoryRepository) {
        this.generationHistoryRepository = generationHistoryRepository;
    }

}
