# Hapi 1: Build-i i aplikacionit (multi-stage build per image me te vogel)
FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /app

# Kopjo skedaret e gradle per te shfrytezuar cache-in
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .

# Jepi leje ekzekutimi gradlew dhe nderto varesite
RUN chmod +x gradlew
RUN ./gradlew dependencies --no-daemon

# Kopjo kodin burimor dhe nderto aplikacionin
COPY src src
RUN ./gradlew build -x test --no-daemon

# Hapi 2: Krijo image-in final me JRE
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Kopjo JAR-in e ndertuar nga faza e pare
COPY --from=build /app/build/libs/*.jar app.jar

# Ekspozo portin (Render e lexon automatikisht kete)
EXPOSE 8080

# Komanda per te ekzekutuar aplikacionin
ENTRYPOINT ["java", "-jar", "app.jar"]