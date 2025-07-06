package com.presentation.generator.service;

import com.presentation.generator.entity.Slide;
import com.presentation.generator.repository.SlideRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SlideService {

    private final SlideRepository slideRepository;

    public SlideService(SlideRepository slideRepository) {
        this.slideRepository = slideRepository;
    }

    public List<Slide> findAll() {
        return slideRepository.findAll();
    }

    public Optional<Slide> findById(Long id) {
        return slideRepository.findById(id);
    }

    public Slide save(Slide slide) {
        return slideRepository.save(slide);
    }

    public Slide update(Long id, Slide updatedSlide) {
        return slideRepository.findById(id)
                .map(slide -> {
                    slide.setTitle(updatedSlide.getTitle());
                    slide.setContent(updatedSlide.getContent());
                    slide.setLayout(updatedSlide.getLayout());
                    slide.setPosition(updatedSlide.getPosition());
                    slide.setPresentation(updatedSlide.getPresentation());
                    return slideRepository.save(slide);
                })
                .orElseThrow(() -> new RuntimeException("Slide not found"));
    }

    public void delete(Long id) {
        slideRepository.deleteById(id);
    }
}
