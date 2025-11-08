
# Math Cards — Backend (Java / Spring Boot)

Overview
--------
This repository contains the backend service for Math Cards implemented in Java using Spring Boot. The service exposes endpoints that generate algebra-style equations (terms, operations, solution) for multiple difficulty levels.

API Endpoints
-------------
- POST /api/generate-equation
	- Request JSON: { "level": "Básico" | "Avanzado" | "Experto", "operation": "+" | "-" | "*" | "/" }
	- Response JSON: an Equation object with fields such as term1, term2, term3, term4, op1, op2, result, operation, variable, solution

- GET /api/healthz
	- Simple health check that returns { "status": "ok" }

Project structure
-----------------
- `pom.xml` — Maven build file for the Spring Boot application.
- `src/main/java/com/mathcards` — Java source code
	- `MathCardsApplication` — Spring Boot application entry point
	- `controller.GenerateEquationController` — REST controller exposing the API
	- `service.GenerateEquationService` — equation generation logic
	- `model.Equation` — JSON model for responses
- `src/main/resources/application.properties` — runtime configuration (server port)

Requirements
------------
- Java 17 or newer (JDK 17+ recommended)
- Maven 3.6+ (or the version bundled with your IDE)

Build and run (Windows — cmd.exe)
--------------------------------
1. Open a terminal and change to the backend directory:

```cmd
cd C:\Users\Valentina\Desktop\math-cards-auth\Backend
```

2. Run with Maven (development):

```cmd
mvn spring-boot:run
```

3. Or build a runnable jar and execute it:

```cmd
mvn clean package
java -jar target/backend-0.0.1-SNAPSHOT.jar
```

By default the application listens on port `4000` (see `src/main/resources/application.properties`).

Integration with the frontend
-----------------------------
During local development the frontend is configured to proxy `/api/*` requests to `http://localhost:4000/api/*`. Ensure the backend is running on port 4000 before starting the frontend so the Next.js app can reach the service.

Suggested next steps and improvements
------------------------------------
- Add unit tests for the service layer (`GenerateEquationService`).
- Add validation for input payloads (e.g. enums for `level` and `operation`).
- Add structured logging and request tracing for production readiness.
- Create a `Dockerfile` to containerize the backend for deployment.

License
-------
MIT


