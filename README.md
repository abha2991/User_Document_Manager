Coding Exercise Documentation
Introduction
This document outlines the design, development, and deployment approach taken, along with
instructions and examples to help you understand and test the solution.
The focus is not only on delivering features but also on demonstrating solid software design,
maintainability, and professional engineering practices.

* Design Overview
   Object-Oriented Design & SOLID Principles
   • The application is built using NestJS, which encourages modularity and dependency injection.
   • Core features are separated into modules (UsersModule, DocumentsModule,
   IngestionModule), each encapsulating its own controllers, services, and repositories.
   • Design patterns such as Repository and Service layers are applied to separate concerns.
   • Adheres to SOLID principles
* Development Practices
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
* Install dependencies: npm install
* Run all tests using the Jest test runner: npm run test
* For continuous watch mode (rerun on file changes): npm run test:watch
   In CI/CD (GitHub Actions)
   • The workflow automatically runs tests on every push.
   • Failed tests block deployment to ensure code reliability.
* Technology & Concepts
   • Frameworks: Node.js, NestJS
   • Core Technologies: HTTP REST API, PostgreSQL database, Docker containerization
   • Security: Basic authentication and validation implemented for user-related routes
   • Scalability: Modular design allows extension of new features with minimal coupling
   • Deployment: Containerized app deployed on Railway with automated GitHub Actions pipeline
* Deployment Instructions
   Prerequisites
   • Docker installed locally (optional for local testing)
   • Railway account (https://railway.app) for cloud deployment (already configured)
   • GitHub repository linked for CI/CD
   Local Setup
* Clone the repository:
   git clone https://github.com/<your-github-username>/<repo-name>.git
   cd <repo-name>
* Install dependencies:
   npm install
* Set environment variables:
   Create a .env file based on .env.example with your database credentials and other secrets.
* Run the application:
   npm run start:dev
   The app runs locally at http://localhost:8080.
   Cloud Deployment on Railway
   • The app is containerized with Docker.
   • On every push to the main branch, GitHub Actions builds the Docker image and pushes it to
   GitHub Container Registry.
   • Railway pulls the latest image and deploys it automatically.
   • Public URL:
   https://userdocumentmanager-production-47b4.up.railway.app
* API Endpoints & Testing with curl
   Below are some example curl commands to test key endpoints of the API.

# **During registration, the default role is set to admin to simplify the process since certain accesses are restricted to _admin_ only. Ideally, the default role should be _viewer_, but because we currently don’t have an admin panel to manage roles, this approach was chosen for convenience. The role can be updated later as needed.**

#    **Register a User**

### Roles Allowed-admin, editor, viewer

   curl -X POST https://userdocumentmanager-production-47b4.up.railway.app/auth/register \
   -H "Content-Type: application/json" \
   -d '{ "username": "testuser", "password": "securepassword" }

#    **Login a User**

### Roles Allowed-admin, editor, viewer

   curl -X POST https://userdocumentmanager-production-47b4.up.railway.app/auth/login \
   -H "Content-Type: application/json" \
   -d '{
   "username": "testuser",
   "password": "securepassword"
   }'
   Expected response: JSON containing JWT token

# **Get User by Username**

### Roles Allowed-admin, editor, viewer

curl -X GET https://userdocumentmanager-production-47b4.up.railway.app/users/<username>

# **Get List of Users (admin and editor only)**

### Roles Allowed-admin, editor

curl -X GET https://userdocumentmanager-production-47b4.up.railway.app/users \
-H "Authorization: Bearer <your-jwt-token>"

# **Update User Role**

### Roles Allowed-admin

curl -X PATCH https://userdocumentmanager-production-47b4.up.railway.app/users/<user-id> \
-H "Authorization: Bearer <your-jwt-token>" \
-H "Content-Type: application/json" \
-d '{
"role": "admin"
}'

#    **Create Document (with file upload)**

### Roles Allowed-admin, editor

   Replace <your-jwt-token> with the token received from login.

   curl -X POST https://userdocumentmanager-production-47b4.up.railway.app/documents \
   -H "Authorization: Bearer <your-jwt-token>" \
   -F "file=@/path/to/your/file.pdf" \
   -F "title=Document Title" \
   -F "content=Document content here"

* Replace /path/to/your/file.pdf with your actual file path.

# **Get All Documents**

### Roles Allowed-admin, editor, viewer

curl -X GET https://userdocumentmanager-production-47b4.up.railway.app/documents \
-H "Authorization: Bearer <your-jwt-token>"

#    **Get Document by ID**

### Roles Allowed-admin, editor, viewer

   curl -X GET https://userdocumentmanager-production-47b4.up.railway.app/documents/<document-id> \
   -H "Authorization: Bearer <your-jwt-token>"

# **Delete Document by ID**

### Roles Allowed-admin, editor

   Replace <document-id> with the actual ID of the document to delete.


   curl -X DELETE https://userdocumentmanager-production-47b4.up.railway.app/documents/<document-id> \
   -H "Authorization: Bearer <your-jwt-token>"

# **Trigger a new ingestion job**

### Roles Allowed-admin, editor

curl -X POST https://userdocumentmanager-production-47b4.up.railway.app/ingestion/trigger \
-H "Authorization: Bearer <your-jwt-token>" \
-H "Content-Type: application/json" \
-d '{
"source": "s3://bucket-name/path",
"config": { "option1": true, "option2": "value" }
}'

**_source can be your fileUrl_**

_Ex-{
"source": "uploads/1750947194717-480524419-Document 16.pdf",
"config": {
"bucket": "documents"
}
}_

# _Get ingestion job status by ID_

### Roles Allowed-admin, editor, viewer

curl -X GET https://userdocumentmanager-production-47b4.up.railway.app/ingestion/status/123 \
-H "Authorization: Bearer <your-jwt-token>"

# **List ingestion jobs for the current user**

### Roles Allowed-admin, editor

curl -X GET https://userdocumentmanager-production-47b4.up.railway.app/ingestion/jobs \
-H "Authorization: Bearer <your-jwt-token>"

6. Additional Notes & Considerations
   • Authentication uses JWT tokens.
   • API validation ensures data integrity.
   • Error handling returns meaningful HTTP status codes and messages.
   • The architecture supports future scalability and feature additions.
   • Automated tests provide confidence in code quality.
