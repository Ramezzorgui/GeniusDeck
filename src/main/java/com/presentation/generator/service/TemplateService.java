package com.presentation.generator.service;

import com.presentation.generator.entity.Template;
import com.presentation.generator.repository.TemplateRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TemplateService {

    private final TemplateRepository templateRepository;

    public TemplateService(TemplateRepository templateRepository) {
        this.templateRepository = templateRepository;
    }

    // ✅ CREATE
    public Template createTemplate(Template template) {
        return templateRepository.save(template);
    }

    // ✅ READ ALL
    public List<Template> getAllTemplates() {
        return templateRepository.findAll();
    }

    // ✅ READ ONE
    public Template getTemplateById(Long id) {
        return templateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Template introuvable avec id : " + id));
    }

    // ✅ UPDATE
    public Template updateTemplate(Long id, Template newData) {
        Template existing = getTemplateById(id);
        existing.setName(newData.getName());
        existing.setCategory(newData.getCategory());
        existing.setStructure(newData.getStructure());
        existing.setStyles(newData.getStyles());
        existing.setPublic(newData.getPublic());
        existing.setCreatedBy(newData.getCreatedBy());
        return templateRepository.save(existing);
    }

    // ✅ DELETE
    public void deleteTemplate(Long id) {
        if (!templateRepository.existsById(id)) {
            throw new RuntimeException("Template introuvable avec id : " + id);
        }
        templateRepository.deleteById(id);
    }
}
