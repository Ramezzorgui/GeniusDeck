package com.presentation.generator.controller;

import com.presentation.generator.entity.Comment;
import com.presentation.generator.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private CommentRepository commentRepo;

    @GetMapping
    public List<Comment> getAllComments() {
        return commentRepo.findAllByOrderByCreatedAtDesc();
    }

    @PostMapping
    public Comment createComment(@RequestBody Comment comment) {
        comment.setCreatedAt(LocalDateTime.now());
        return commentRepo.save(comment);
    }
    @GetMapping("/latest")
    public List<Comment> getLatestComments() {
        return commentRepo.findTop3ByOrderByCreatedAtDesc();
    }

    @GetMapping("/admin/comments")
    public List<Comment> getAllCommentsForAdmin() {
        return commentRepo.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    }

}