FROM ubuntu:latest
LABEL authors="Carlo"

ENTRYPOINT ["top", "-b"]

# Använd en Java-bild som bas
FROM openjdk:17-jdk-slim

# Ställ in arbetskatalog
WORKDIR /app

# Kopiera projektet och bygga backend
COPY . .
RUN ./mvnw package -DskipTests

# Exponera port 8080
EXPOSE 8080

# Starta applikationen
CMD ["java", "-jar", "/app/target/journalSystem-0.0.1-SNAPSHOT.jar"]
