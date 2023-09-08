FROM registry.access.redhat.com/ubi8/openjdk-11:1.17 AS builder

# WORKDIR /home/jboss

COPY mvnw .
COPY .mvn .mvn

COPY pom.xml .
COPY src src

RUN ./mvnw clean compile package

FROM registry.access.redhat.com/ubi8/openjdk-11:1.17 

COPY --from=builder /home/jboss/target/greeting-*.jar ./app.jar

EXPOSE 5000

ENTRYPOINT ["java", "-jar", "./app.jar"]