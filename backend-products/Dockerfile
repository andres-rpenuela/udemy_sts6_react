# Stage 1: Build
FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app

# Copiar pom.xml y bajar dependencias
COPY pom.xml .
RUN mvn dependency:go-offline

# Copiar código fuente
COPY src ./src

# Compilar JAR
RUN mvn clean package -DskipTests

# Stage final híbrido
FROM eclipse-temurin:21-jdk-alpine AS final
WORKDIR /app

# Argumento para definir entorno
ARG ENVIRONMENT=test
ENV ENVIRONMENT=${ENVIRONMENT}

# Exponer puerto
EXPOSE 8080

# Copiar JAR generado (se usa solo en prod)
COPY --from=build /app/target/*.jar app.jar

# Volúmenes para desarrollo
VOLUME ["/app/src", "/app/pom.xml"]

# ENTRYPOINT condicional
CMD if [ "$ENVIRONMENT" = "test" ]; then \
        echo "Starting in development mode..."; \
        mvn spring-boot:run; \
    else \
        echo "Starting in production mode..."; \
        java -jar /app/app.jar; \
    fi
