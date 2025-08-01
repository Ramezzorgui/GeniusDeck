package com.presentation.generator.repository;

import com.presentation.generator.entity.PasswordResetToken;
import org.springframework.data.jpa.repository.JpaRepository;
import com.presentation.generator.entity.User;


import java.util.Optional;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    Optional<PasswordResetToken> findByToken(String token);
    Optional<PasswordResetToken> findByUser(User user);

}
