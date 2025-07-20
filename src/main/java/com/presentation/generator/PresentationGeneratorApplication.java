package com.presentation.generator;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {
		"com.presentation.generator", // Votre package racine
		"com.presentation.generator.security.Jwt", // Le package de vos classes JWT
		"com.presentation.generator.security.services" // Le package de vos services de sécurité
})
public class PresentationGeneratorApplication {

	public static void main(String[] args) {
		SpringApplication.run(PresentationGeneratorApplication.class, args);
	}

}
