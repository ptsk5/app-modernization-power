# Greeting app

Java Spring Boot simple application which:

- returns an array of greeting texts

## Configuration

| Environment variable | Description                                                                                                                                                          |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GREETINGS            | a list of greetings divided by `;` (semicolon). If it is not specified a default message is returned in a response array, i.e.: `You did not specify any greetings.` |

## Run it locally

Export optional environment variable to configure a greeting messages:

```bash
export GREETINGS="Hello Jiri.;Hello Maria."
```

Add file execution permissions on Maven wrapper script file:

```bash
chmod +x mvnw
```

Run the app:

```bash
./mvnw spring-boot:run

```

Or package first and then run:

```bash
./mvnw clean compile package
java -jar target/greeting-*.jar
```

## Test if the greeting service works

[`GET`] get a greeting array:

```bash
curl -X GET localhost:5000/api/greetings
```
