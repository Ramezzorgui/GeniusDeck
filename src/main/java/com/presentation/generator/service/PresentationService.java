package com.presentation.generator.service;

import com.presentation.generator.repository.PresentationRepository;
import org.springframework.stereotype.Service;

@Service
public class PresentationService {
    private final PresentationRepository presentationRepository;

    public PresentationService(PresentationRepository presentationRepository) {
        this.presentationRepository = presentationRepository;
    }
}
