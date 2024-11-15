FROM openjdk:17-jdk-slim

WORKDIR /app

# Kopiera alla projektfiler till Docker-kontainern
COPY . .

# Kontrollera att Maven-wrappern är körbar
RUN chmod +x mvnw && ls -l mvnw

# Bygg projektet utan att köra tester
RUN ./mvnw package -DskipTests

EXPOSE 8080

CMD ["java", "-jar", "/app/target/journalSystem-0.0.1-SNAPSHOT.jar"]
