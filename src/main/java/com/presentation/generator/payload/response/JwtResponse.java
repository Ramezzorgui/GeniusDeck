    package com.presentation.generator.payload.response;

    import java.util.List;

    public class JwtResponse {
        private String token;
        private String type = "Bearer";
        private Long id;
        private String email;
        private String name; // Ajout du nom
        private List<String> roles;

        private String imageUrl;

        public JwtResponse(String accessToken, Long id, String email, String name, String imageUrl, List<String> roles) {
            this.token = accessToken;
            this.id = id;
            this.email = email;
            this.name = name; // Initialisation du nom
            this.roles = roles;
            this.imageUrl = imageUrl;
        }

        public String getImageUrl() {
            return imageUrl;
        }

        public void setImageUrl(String imageUrl) {
            this.imageUrl = imageUrl;
        }

        public String getAccessToken() {
            return token;
        }

        public void setAccessToken(String accessToken) {
            this.token = accessToken;
        }

        public String getTokenType() {
            return type;
        }

        public void setTokenType(String tokenType) {
            this.type = tokenType;
        }

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getName() { // Getter pour le nom
            return name;
        }

        public void setName(String name) { // Setter pour le nom
            this.name = name;
        }

        public List<String> getRoles() {
            return roles;
        }
    }
