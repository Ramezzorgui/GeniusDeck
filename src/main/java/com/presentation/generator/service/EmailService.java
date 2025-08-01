package com.presentation.generator.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;


@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendResetPasswordEmail(String to, String resetLink) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject("Réinitialisation de mot de passe");
            message.setText("Cliquez sur ce lien : " + resetLink);
            mailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();
            // Ou logger.error("Erreur envoi mail", e);
        }
    }

}
