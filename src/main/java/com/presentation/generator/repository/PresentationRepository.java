package com.presentation.generator.repository;

import com.presentation.generator.entity.Presentation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PresentationRepository extends JpaRepository<Presentation, Long> {
    // Trouve toutes les présentations pour un ID utilisateur donné
    List<Presentation> findByUserId(Long userId);

    // Trouve une présentation par son ID et l'ID de son propriétaire
    Optional<Presentation> findByIdAndUserId(Long id, Long userId);

    // Vérifie si une présentation existe avec cet ID et propriétaire (plus efficace pour la suppression)
    boolean existsByIdAndUserId(Long id, Long userId);


}
