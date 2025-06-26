Coding Exercise Documentation
Introduction
This document outlines the design, development, and deployment approach taken, along with
instructions and examples to help you understand and test the solution.
The focus is not only on delivering features but also on demonstrating solid software design,
maintainability, and professional engineering practices.

1. Design Overview
   Object-Oriented Design & SOLID Principles
   • The application is built using NestJS, which encourages modularity and dependency injection.
   • Core features are separated into modules (UsersModule, DocumentsModule,
   IngestionModule), each encapsulating its own controllers, services, and repositories.
   • Design patterns such as Repository and Service layers are applied to separate concerns.
   • Adheres to SOLID principles

2. Development Practices
   Git Usage
   • Commits are small, logically grouped, and well-described.
   • Branches are used for feature development and merged via pull requests.
   • Commit history shows incremental progress and issue resolutions.
   Code Structure
   • Clear folder structure following NestJS conventions (modules, controllers, services, entities).
   • Typescript typings and interfaces ensure type safety.
   • Environment variables are used for configuration.
   Documentation
   • This document provides high-level overview and deployment instructions.
   • API endpoints are described with example requests below.
   Testing
   • Automated tests are implemented using Jest framework.
   • Tests cover both unit and integration scenarios for critical services and controllers.
   • Test files are located alongside source code, typically with .spec.ts extension.
   How to Run Tests
   Locally
1. Install dependencies: npm install
2. Run all tests using the Jest test runner: npm run test
3. For continuous watch mode (rerun on file changes): npm run test:watch
   In CI/CD (GitHub Actions)
   • The workflow automatically runs tests on every push.
   • Failed tests block deployment to ensure code reliability.

3. Technology & Concepts
   • Frameworks: Node.js, NestJS
   • Core Technologies: HTTP REST API, PostgreSQL database, Docker containerization
   • Security: Basic authentication and validation implemented for user-related routes
   • Scalability: Modular design allows extension of new features with minimal coupling
   • Deployment: Containerized app deployed on Railway with automated GitHub Actions pipeline

4. Deployment Instructions
   Prerequisites
   • Docker installed locally (optional for local testing)
   • Railway account (https://railway.app) for cloud deployment (already configured)
   • GitHub repository linked for CI/CD
   Local Setup
1. Clone the repository:
   git clone https://github.com/<your-github-username>/<repo-name>.git
   cd <repo-name>
2. Install dependencies:
   npm install
3. Set environment variables:
   Create a .env file based on .env.example with your database credentials and other secrets.
4. Run the application:
   npm run start:dev
   The app runs locally at http://localhost:8080.
   Cloud Deployment on Railway
   • The app is containerized with Docker.
   • On every push to the main branch, GitHub Actions builds the Docker image and pushes it to
   GitHub Container Registry.
   • Railway pulls the latest image and deploys it automatically.
   • Public URL:
   https://userdocumentmanager-production-47b4.up.railway.app
5. API Endpoints & Testing with curl
   Below are some example curl commands to test key endpoints of the API.

#    **Register a User**

   curl -X POST https://userdocumentmanager-production-47b4.up.railway.app/auth/register \
   -H "Content-Type: application/json" \
   -d '{ "username": "testuser", "password": "securepassword" }

#    **Login a User**

   curl -X POST https://userdocumentmanager-production-47b4.up.railway.app/auth/login \
   -H "Content-Type: application/json" \
   -d '{
   "username": "testuser",
   "password": "securepassword"
   }'
   Expected response: JSON containing JWT token

#    **Create a Document**

   Replace <your-jwt-token> with the token received from login.
   curl -X POST https://userdocumentmanager-production-47b4.up.railway.app/documents \
   -H "Authorization: Bearer <your-jwt-token>" \
   -H "Content-Type: application/json" \
   -d '{
   "title": "My Document",
   "content": "This is a sample document."
   }'

#    ****Get Documents List****

   curl -X GET https://userdocumentmanager-production-47b4.up.railway.app/documents \
   -H "Authorization: Bearer <your-jwt-token>"
   Delete a Document by ID
   Replace <document-id> with the actual ID of the document to delete.
   curl -X DELETE https://userdocumentmanager-production-
   47b4.up.railway.app/documents/<document-id> \
   -H "Authorization: Bearer <your-jwt-token>"

6. Additional Notes & Considerations
   • Authentication uses JWT tokens.
   • API validation ensures data integrity.
   • Error handling returns meaningful HTTP status codes and messages.
   • The architecture supports future scalability and feature additions.
   • Automated tests provide confidence in code quality.
