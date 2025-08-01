package com.presentation.generator.security.services;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.presentation.generator.entity.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

public class UserDetailsImpl implements UserDetails {
    private static final long serialVersionUID = 1L;

    private Long id;
    private String email;
    private String name; // Ajout du nom
    private String imageUrl;

    @JsonIgnore
    private String password;

    private Collection<? extends GrantedAuthority> authorities;

    public UserDetailsImpl(Long id, String email, String password, String name, String imageUrl,
                           Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name; // Initialisation du nom
        this.authorities = authorities;
        this.imageUrl = imageUrl;
    }

    public static UserDetailsImpl build(User user) {
        // Assurez-vous que le rôle n'est pas nul
        List<GrantedAuthority> authorities = Collections.singletonList(
                new SimpleGrantedAuthority(user.getRole().name())); // Assurez-vous que votre enum Role a une méthode name() ou toString() appropriée
        // Si votre enum Role est juste Role.USER, Role.ADMIN, etc., alors user.getRole().name() est correct.
        // Si c'est une entité Role avec un champ 'name', alors user.getRole().getName()

        return new UserDetailsImpl(
                user.getId(),
                user.getEmail(),
                user.getPassword(),
                user.getName(), // Passage du nom
                user.getImageUrl(),
                authorities);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() { // Spring Security utilise getUsername() pour l'identifiant unique
        return email; // Nous utilisons l'email comme nom d'utilisateur
    }

    public String getName() { // Getter pour le nom
        return name;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        UserDetailsImpl user = (UserDetailsImpl) o;
        return Objects.equals(id, user.id);
    }
}
