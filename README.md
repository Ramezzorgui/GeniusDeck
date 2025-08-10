📊 GeniusDeck — Automated Presentation Creator

📌 Project Description  
GeniusDeck is an innovative web application designed to automatically generate professional presentations from a simple user brief using AI (**Gemini API**).  
It allows:  
- Intelligent generation of slide structure and content.  
- Real-time editing and customization.  
- Multi-format export (PDF, PPTX, PNG/JPG).  
- Template management and personalization.  

---

🧾 Table of Contents
- Features
- Project Structure
- Installation & Launch
  1. Backend (Spring Boot)
  2. Frontend (Angular)
- Technologies Used
- Authentication and Roles
- Security
- Deployment
- Team
- Final Remarks

---

✅ Features

**General**
- AI-powered structure and content generation (Gemini API).
- Real-time preview of modifications.
- Multi-format export: PDF, PPTX, PNG/JPG.

**Users**
- Account creation and login.
- Manage personal presentations.
- Save, edit, and delete presentations.

**Templates**
- Predefined templates (Business, Education, Pitch, Report…).
- Create and save custom templates.
- Community-shared template library.

**Editing**
- WYSIWYG editor.
- Drag-and-drop slide organization.
- Change colors, fonts, and layout.
- Undo/Redo with version history.

---

🗂 Project Structure
root/
├── backend/ # Backend: Spring Boot (REST API)
│ ├── src/main/java/
│ └── src/main/resources/
├── frontend/ # Frontend: Angular
│ ├── src/app/
│ └── src/assets/
└── README.md # Documentation

---

🚀 Installation & Launch

**Prerequisites**
- Java 17+
- Angular CLI v18+
- PostgreSQL 15+
- Maven
- npm
- Gemini API Key

**Configuration**
Create a `.env` or `application.yml` in the backend:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/geniusdeck
    username: user
    password: pass
gemini:
  api-key: your_gemini_api_key
1. Backend (Spring Boot)
cd backend
./mvnw clean install
./mvnw spring-boot:run
📍 REST API available at: http://localhost:8080

2. Frontend (Angular)
cd frontend
npm install
ng serve --open
📍 App available at: http://localhost:4200

🛠 Technologies Used

Layer	Technologies
Backend	Java 17, Spring Boot 3.x, Spring Data JPA, PostgreSQL, Maven
Frontend	Angular 17, TypeScript, HTML5, SCSS/TailwindCSS
Export	iTextPDF (PDF), Apache POI (PPTX), ImageIO (PNG/JPG)
AI Integration	Gemini API
Authentication	Spring Security, JWT

👤 Authentication and Roles

Anonymous User: Can try limited presentation creation.

Registered User: Full access to presentation creation, editing, and export.

Admin: Manage templates, users, and system configurations.

🔐 Security

JWT authentication with Spring Security.

Password hashing with BCrypt.

Input validation on backend and frontend.

Role-based access control (RBAC).

🚀 Deployment

Frontend: Deployed on Netlify
https://willowy-chebakia-07cb0b.netlify.app/home

Backend: Deployed on Railway
geniusdeck-backend-production.up.railway.app

👨‍💻 Team

Zorgui Ramez (Full Stack Developer)

📌 Final Remarks

The project is actively under development.

Upcoming features:

Real-time collaboration.

Integration with Google Slides.

Advanced AI prompts for better design suggestions.

---

💡 Je peux aussi te faire **une version stylée avec icônes, badges et liens cliquables vers ton Netlify et Railway** pour que ça attire plus sur GitHub.  
Veux-tu que je te prépare cette **version colorée avec déploiement mis en avant** ?







Vous avez dit :
je veux ajouter aussi que j'ai fait Reset Password avec mailing 


ChatGPT a dit :
Parfait 👍
Je vais mettre à jour ton README stylé en incluant que tu as implémenté la fonctionnalité Reset Password avec envoi d’email, et je vais garder la section Déploiement claire avec Netlify & Railway.

Voici la version améliorée :

markdown
Copier
Modifier
📊 GeniusDeck — Automated Presentation Creator

📌 Project Description  
GeniusDeck is an innovative web application designed to automatically generate professional presentations from a simple user brief using AI (**Gemini API**).  
It allows:  
- Intelligent generation of slide structure and content.  
- Real-time editing and customization.  
- Multi-format export (PDF, PPTX, PNG/JPG).  
- Template management and personalization.  
- **Password reset via email** for secure account recovery.  

---

🧾 Table of Contents
- Features
- Project Structure
- Installation & Launch
  1. Backend (Spring Boot)
  2. Frontend (Angular)
- Technologies Used
- Authentication and Roles
- Security
- Deployment
- Team
- Final Remarks

---

✅ Features

**General**
- AI-powered structure and content generation (Gemini API).
- Real-time preview of modifications.
- Multi-format export: PDF, PPTX, PNG/JPG.
- Password reset with secure email verification link.

**Users**
- Account creation and login.
- Manage personal presentations.
- Save, edit, and delete presentations.
- Reset password via email.

**Templates**
- Predefined templates (Business, Education, Pitch, Report…).
- Create and save custom templates.
- Community-shared template library.

**Editing**
- WYSIWYG editor.
- Drag-and-drop slide organization.
- Change colors, fonts, and layout.
- Undo/Redo with version history.

---

🗂 Project Structure
root/
├── backend/ # Backend: Spring Boot (REST API)
│ ├── src/main/java/
│ └── src/main/resources/
├── frontend/ # Frontend: Angular
│ ├── src/app/
│ └── src/assets/
└── README.md # Documentation

yaml
Copier
Modifier

---

🚀 Installation & Launch

**Prerequisites**
- Java 17+
- Node.js v18+
- PostgreSQL 15+
- Maven
- npm
- Gemini API Key
- SMTP credentials for email service (for password reset)

**Configuration**
Create a `.env` or `application.yml` in the backend:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/geniusdeck
    username: user
    password: pass
gemini:
  api-key: your_gemini_api_key

spring:
  mail:
    host: smtp.yourprovider.com
    port: 587
    username: your_email
    password: your_email_password
    properties:
      mail:
        smtp:
          auth: true
          starttls:
            enable: true
1. Backend (Spring Boot)
bash
Copier
Modifier
cd backend
./mvnw clean install
./mvnw spring-boot:run
📍 REST API available at: http://localhost:8080

2. Frontend (Angular)
bash
Copier
Modifier
cd frontend
npm install
ng serve --open
📍 App available at: http://localhost:4200

🛠 Technologies Used

Layer	Technologies
Backend	Java 17, Spring Boot 3.x, Spring Data JPA, PostgreSQL, Maven
Frontend	Angular 17, TypeScript, HTML5, SCSS/TailwindCSS
Export	iTextPDF (PDF), Apache POI (PPTX), ImageIO (PNG/JPG)
AI Integration	Gemini API
Authentication	Spring Security, JWT, Email-based password reset

👤 Authentication and Roles

Anonymous User: Can try limited presentation creation.

Registered User: Full access to presentation creation, editing, and export.

Admin: Manage templates, users, and system configurations.

🔐 Security

JWT authentication with Spring Security.

Password hashing with BCrypt.

Secure email verification for password reset.

Input validation on backend and frontend.

Role-based access control (RBAC).

🚀 Deployment

Frontend: Deployed on Netlify (Add your live link here)

Backend: Deployed on Railway (Add your API link here)

👨‍💻 Team

Zorgui Ramez (Full Stack Developer)

[Add other members if applicable]

🎓 Class: [Your Class Here]
👥 Group: [Your Group Here]
🧑‍🏫 Supervised by: [Supervisor Name]

📌 Final Remarks

The project is actively under development.

Upcoming features:

Real-time collaboration.

Integration with Google Slides.

Advanced AI prompts for better design suggestions.

yaml
Copier
Modifier
