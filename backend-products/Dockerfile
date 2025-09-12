# -----------------------------
# Stage 1: Build (compila y empaqueta)
# -----------------------------
FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app

COPY pom.xml .
RUN mvn dependency:go-offline

COPY src ./src
RUN mvn clean package -DskipTests

# -----------------------------
# Stage 2: Runtime para test (hot reload)
# -----------------------------
FROM maven:3.9.9-eclipse-temurin-21 AS test
WORKDIR /app
COPY . .
CMD ["mvn", "spring-boot:run"]

# -----------------------------
# Stage 3: Runtime para dev/prod (ejecuta JAR)
# -----------------------------
FROM eclipse-temurin:21-jdk-alpine AS dev
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]

# -----------------------------
# Stage 4: Validación (solo ejecutar tests)
# -----------------------------
FROM maven:3.9.9-eclipse-temurin-21 AS test-only
WORKDIR /app
COPY pom.xml .
COPY src ./src

# Ejecuta únicamente los tests
CMD ["mvn", "test"]
