package com.presentation.generator.controller;

import com.presentation.generator.entity.Slide;
import com.presentation.generator.service.SlideService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/slides")
public class SlideController {

    private final SlideService slideService;

    public SlideController(SlideService slideService) {
        this.slideService = slideService;
    }

    @GetMapping
    public List<Slide> getAllSlides() {
        return slideService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Slide> getSlideById(@PathVariable Long id) {
        return slideService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Slide> createSlide(@RequestBody Slide slide) {
        return ResponseEntity.ok(slideService.save(slide));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Slide> updateSlide(@PathVariable Long id, @RequestBody Slide slide) {
        return ResponseEntity.ok(slideService.update(id, slide));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSlide(@PathVariable Long id) {
        slideService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
