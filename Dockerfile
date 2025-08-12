# Étape 1 : builder l'app Angular
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build -- --configuration production

# Étape 2 : servir l'app avec un serveur nginx
FROM nginx:alpine
COPY --from=build /app/dist/angular-16-jwt-auth /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
