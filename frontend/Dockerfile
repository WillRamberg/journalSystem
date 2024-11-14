# Steg 1: Bygg Vite-projektet
FROM oven/bun:latest AS builder

# Ställ in arbetskatalog
WORKDIR /app

# Kopiera package.json och package-lock.json för att installera beroenden
COPY package*.json ./

# Installera beroenden
RUN bun install

# Kopiera resten av koden och bygg projektet
COPY . .
RUN bun run build

# Steg 2: Servera med Nginx
FROM nginx:latest

# Kopiera byggda filer från "builder"-steget till Nginx
COPY --from=builder /app/dist/ /usr/share/nginx/html/

# Kopiera en egen Nginx-konfiguration om du vill (valfritt)
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Exponera port 3000
EXPOSE 3000

# Starta Nginx
CMD ["nginx", "-g", "daemon off;"]