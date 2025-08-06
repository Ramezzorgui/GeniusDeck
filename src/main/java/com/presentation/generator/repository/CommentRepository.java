package com.presentation.generator.repository;

import com.presentation.generator.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findAllByOrderByCreatedAtDesc();

    List<Comment> findTop3ByOrderByCreatedAtDesc();

}
