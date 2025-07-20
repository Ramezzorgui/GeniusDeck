package com.presentation.generator.controller;

import com.presentation.generator.entity.Template;
import com.presentation.generator.service.TemplateService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/templates")
public class TemplateController {

    private final TemplateService templateService;

    public TemplateController(TemplateService templateService) {
        this.templateService = templateService;
    }

    // ✅ CREATE
    @PostMapping
    public Template createTemplate(@RequestBody Template template) {
        return templateService.createTemplate(template);
    }

    // ✅ READ ALL
    @GetMapping
    public List<Template> getAllTemplates() {
        return templateService.getAllTemplates();
    }

    // ✅ READ ONE
    @GetMapping("/{id}")
    public Template getTemplateById(@PathVariable Long id) {
        return templateService.getTemplateById(id);
    }

    // ✅ UPDATE
    @PutMapping("/{id}")
    public Template updateTemplate(@PathVariable Long id, @RequestBody Template template) {
        return templateService.updateTemplate(id, template);
    }

    // ✅ DELETE
    @DeleteMapping("/{id}")
    public void deleteTemplate(@PathVariable Long id) {
        templateService.deleteTemplate(id);
    }
}
