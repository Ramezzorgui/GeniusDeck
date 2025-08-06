package com.presentation.generator.security.Jwt;

import com.presentation.generator.security.services.UserDetailsServiceImpl;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class AuthTokenFilter extends OncePerRequestFilter {
    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    private static final Logger logger = LoggerFactory.getLogger(AuthTokenFilter.class  );

    // AJOUTEZ CE CONSTRUCTEUR
    public AuthTokenFilter() {
        System.out.println("AuthTokenFilter instance created!");
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        try {
            String jwt = parseJwt(request);
            System.out.println("🔐 JWT reçu : " + (jwt != null ? jwt : "null")); // Affiche le JWT ou "null"

            if (jwt != null && jwtUtils.validateJwtToken(jwt)) {
                // Si on arrive ici, le JWT a été trouvé et validé avec succès
                System.out.println("✅ JWT validé avec succès."); // Nouveau message clair

                String username = jwtUtils.getUserNameFromJwtToken(jwt);

                UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authentication);
                System.out.println("✅ Authentification de l'utilisateur " + username + " définie dans le contexte de sécurité.");

            } else {
                // Si on arrive ici, soit le JWT est null, soit il n'est pas valide
                if (jwt == null) {
                    System.out.println("❌ Aucun JWT trouvé dans l'en-tête Authorization.");
                } else {
                    // Le JWT a été trouvé mais n'est pas valide (expiration, signature, etc.)
                    // Les erreurs spécifiques seront loguées par jwtUtils.validateJwtToken
                    System.out.println("❌ JWT trouvé mais validation échouée. Voir les logs de JwtUtils pour plus de détails.");
                }
            }
        } catch (Exception e) {
            logger.error("❌ Échec d'authentification JWT : {}", e.getMessage(), e);
            logger.error("Cannot set user authentication: {}", e.getMessage());
        }

        filterChain.doFilter(request, response);
    }

    private String parseJwt(HttpServletRequest request) {
        String headerAuth = request.getHeader("Authorization");

        if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
            return headerAuth.substring(7);
        }

        return null;
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String path = request.getRequestURI();
        return path.startsWith("/api/auth/google");}
}
