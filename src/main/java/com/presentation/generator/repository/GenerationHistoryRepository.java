package com.presentation.generator.repository;

import com.presentation.generator.entity.GenerationHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GenerationHistoryRepository extends JpaRepository<GenerationHistory, Long> {
}
