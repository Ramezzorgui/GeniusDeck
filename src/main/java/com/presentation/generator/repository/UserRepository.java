package com.presentation.generator.repository;

import com.presentation.generator.entity.Role;
import com.presentation.generator.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Boolean existsByEmail(String email);

    long countByRole(String role);

    long countByRole(Role role);

    @Query("SELECT COUNT(u) FROM User u WHERE u.lastLogin BETWEEN :start AND :end")
    int countUsersActiveBetween(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);
}
