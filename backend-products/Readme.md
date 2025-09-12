# Notas importantes

1. Perfil de test: ambos servicios solo se levantan con:
``` bash
docker-compose --profile test up -d
```
2. Persistencia de datos: MySQL almacena los datos en ./mysql_data dentro del proyecto.
3. Spring Boot: se conecta a MySQL usando SPRING_DATASOURCE_URL=jdbc:mysql://db:3306/testdb.
4. Java 21: usamos la imagen oficial eclipse-temurin:21-jdk-alpine, ligera y actualizada.