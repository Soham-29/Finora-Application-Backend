FROM eclipse-temurin:21-jre
WORKDIR /app
COPY target/moneyManager-0.0.1-SNAPSHOT.jar moneymanagerapp-V1.0.jar
EXPOSE 9090
ENTRYPOINT ["java","-jar","moneymanagerapp-V1.0.jar"]