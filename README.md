# DSALTA Case Study - Task Management API

A comprehensive NestJS-based REST API for managing compliance tasks with JWT authentication, built with TypeScript, PostgreSQL, and Swagger documentation.

## Features

- **Task Management**: Create, read, update, and delete compliance tasks
- **JWT Authentication**: Secure user registration and login system
- **Task Filtering**: Filter tasks by category and framework
- **Data Validation**: Comprehensive input validation using class-validator
- **API Documentation**: Interactive Swagger/OpenAPI documentation
- **Database Integration**: PostgreSQL with TypeORM
- **Caching**: Redis-compatible caching with cache-manager
- **Docker Support**: Both development and production Docker configurations
- **Type Safety**: Full TypeScript implementation

## Task Categories & Frameworks

### Categories
- `MONITORING`: System and compliance monitoring tasks
- `ACCESS_CONTROL`: Risk and compliance assessments
- `MAINTENANCE`: Documentation and reporting tasks
- `SECURITY_AUDIT`: Staff training and awareness programs

### Frameworks
- `DSALTA`: placeholder framework
- `DSALTA-1`: placeholder framework
- `DSALTA-2`: placeholder framework

### Task Statuses
- `OPEN`: Task created and active
- `IN_PROGRESS`: Task currently being worked on
- `DONE`: Task finished successfully

## Technology Stack

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Authentication**: JWT
- **Validation**: class-validator
- **Documentation**: Swagger/OpenAPI
- **Caching**: cache-manager
- **Containerization**: Docker & Docker Compose

## Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- Docker & Docker Compose

### Environment Configuration

1. Copy the sample environment file:
```bash
cp sample.env .env
```

2. Configure your environment variables in `.env`:
```env
PORT=3000
DB_HOST=dsalta-postgres
DB_PORT=5432
DB_USERNAME=dsalta-postgres-admin
DB_NAME=dsalta
DB_PASSWORD=dsalta-postgres-password
JWT_SECRET=dsalta-jwt-secret
```

### Option 1: Docker Setup (Recommended)

1. **Create Docker network** (only for production - not needed in dev-mode):
```bash
docker network create dsalta-network
```

2. **Development with Docker**:
```bash
# Start development environment
docker-compose -f dev.docker-compose.yml up --build

# View logs
docker-compose -f dev.docker-compose.yml logs -f
```

3. **Production with Docker**:
```bash
# Start production environment
docker-compose up --build -d

# View logs
docker-compose logs -f dsalta-api
```

4. **Run migrations**:
```bash
docker exec dsalta-api npm run typeorm:migration:run
```

### Option 2: Local Development Setup

1. **Install dependencies**:
```bash
npm install
```

2. **Start PostgreSQL** (ensure it's running on your system)

3. **Run database migrations**:
```bash
npm run typeorm:migration:run
```

4. **Start the development server**:
```bash
# Development mode with watch
npm run start:dev

# Debug mode
npm run start:debug

# Production build
npm run build
npm run start:prod
```

## Development Commands

```bash
# Linting and formatting
npm run lf:check          # Run Biome check
npm run lf:lint           # Run Biome lint
npm run lf:format         # Run Biome format
npm run prettier:fix      # Run Prettier

# Testing
npm run test              # Run unit tests
npm run test:watch        # Run tests in watch mode
npm run test:cov          # Run tests with coverage
npm run test:e2e          # Run end-to-end tests

# Database migrations
npm run typeorm:migration:generate -- src/migrations/MigrationName
npm run typeorm:migration:run
npm run typeorm:migration:revert
```

## API Documentation

### Base URL
- **Development**: `http://localhost:3000`
- **Swagger Documentation**: `http://localhost:3000/apidocs`

### Authentication

All task endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## API Endpoints

### Authentication Endpoints

#### POST /auth/signup
Register a new user account.

**Request Body:**
```json
{
  "email": "test@email.com",
  "password": "test-password"
}
```

**Response (201):**
```json
{
  "token": "<BEARER-TOKEN>",
  "tokenType": "Bearer"
}
```

**Error Responses:**
- `400`: Invalid input data
- `409`: User already exists

#### POST /auth/login
Authenticate an existing user.

**Request Body:**
```json
{
  "email": "test@email.com",
  "password": "test-password"
}
```

**Response (200):**
```json
{
  "token": "<BEARER-TOKEN>",
  "tokenType": "Bearer"
}
```

**Error Responses:**
- `400`: Invalid input data
- `401`: Invalid credentials

### Task Management Endpoints

#### POST /task
Create a new task.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Quarterly Security Assessment",
  "description": "Conduct comprehensive security assessment for Q4",
  "framework": "DSALTA",
  "category": "SECURITY_AUDIT"
}
```

**Response (201):**
```json
{
  "id": "<UUID>",
  "name": "Quarterly Security Assessment",
  "description": "Conduct comprehensive security assessment for Q4",
  "framework": "DSALTA",
  "category": "SECURITY_AUDIT",
  "status": "OPEN",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

**Error Responses:**
- `400`: Invalid input data
- `401`: Unauthorized

#### GET /task
Retrieve all tasks.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
[
  {
    "id": "<UUID>",
    "name": "Quarterly Security Assessment",
    "description": "Conduct comprehensive security assessment for Q4",
    "framework": "DSALTA",
    "category": "SECURITY_AUDIT",
    "status": "OPEN",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
]
```

#### GET /task/filter
Retrieve filtered tasks by category and/or framework.

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `category` (optional): Filter by task category (MONITORING, SECURITY_AUDIT, MAINTENANCE, ACCESS_CONTROL)
- `framework` (optional): Filter by framework (DSALTA, DSALTA-1, DSALTA-2)

**Example Request:**
```
GET /task/filter?category=MONITORING&framework=DSALTA-1
```

**Response (200):**
```json
[
  {
    "id": "<UUID>",
    "name": "Quarterly Security Assessment",
    "description": "Conduct comprehensive security assessment for Q4",
    "framework": "DSALTA-1",
    "category": "MONITORING",
    "status": "OPEN",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
]
```

#### GET /task/:id
Retrieve a specific task by ID.

**Headers:**
```
Authorization: Bearer <token>
```

**Parameters:**
- `id`: Task UUID

**Response (200):**
```json
{
  "id": "<UUID>",
  "name": "Quarterly Security Assessment",
  "description": "Conduct comprehensive security assessment for Q4",
  "framework": "DSALTA-1",
  "category": "MONITORING",
  "status": "OPEN",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

**Error Responses:**
- `404`: Task not found
- `401`: Unauthorized

#### PUT /task/:id
Update an existing task.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Parameters:**
- `id`: Task UUID

**Request Body (all fields optional):**
```json
{
  "name": "Updated Task Name",
  "description": "Updated description",
  "framework": "DSALTA-2",
  "category": "ACCESS_CONTROL",
  "status": "IN_PROGRESS"
}
```

**Response (200):**
```json
{
  "id": "<UUID>",
  "name": "Updated Task Name",
  "description": "Updated description",
  "framework": "DSALTA-2",
  "category": "ACCESS_CONTROL",
  "status": "IN_PROGRESS",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T14:45:00.000Z"
}
```

**Error Responses:**
- `400`: Invalid input data
- `404`: Task not found
- `401`: Unauthorized

#### DELETE /task/:id
Delete a task.

**Headers:**
```
Authorization: Bearer <token>
```

**Parameters:**
- `id`: Task UUID

**Response (204):**
No content

**Error Responses:**
- `404`: Task not found
- `401`: Unauthorized

## Interactive API Documentation

The project includes comprehensive Swagger/OpenAPI documentation available at:

**URL**: `http://localhost:3000/apidocs`

### Features:
- **Interactive Interface**: Test all endpoints directly from the browser
- **Authentication Support**: Built-in JWT token management
- **Request/Response Examples**: See real examples for all endpoints
- **Schema Documentation**: Detailed information about all data models
- **Error Response Documentation**: Complete error handling documentation

### Using Swagger Documentation:

1. **Start the application** (locally or with Docker)
2. **Navigate to** `http://localhost:3000/apidocs`
3. **Authenticate**:
   - Use the signup/login endpoints to get a JWT token
   - Click the "Authorize" button in Swagger UI
   - Enter: `Bearer <your-jwt-token>`
4. **Test Endpoints**: Use the "Try it out" feature to test any endpoint

## Project Structure

```
src/
├── auth/                   # Authentication module
│   ├── dto/                # Auth DTOs
│   ├── entities/           # Auth entities
│   ├── interfaces/         # Auth interfaces
│   ├── auth.controller.ts  # Auth endpoints
│   ├── auth.service.ts     # Auth business logic
│   └── auth.module.ts      # Auth module configuration
├── task/                   # Task management module
│   ├── dto/                # Task DTOs
│   ├── entities/           # Task entities
│   ├── enums/              # Task enums
│   ├── interfaces/         # Task interfaces
│   ├── task.controller.ts  # Task endpoints
│   ├── task.service.ts     # Task business logic
│   └── task.module.ts      # Task module configuration
├── decorators/           # Custom decorators
├── guards/               # Authentication guards
├── app.module.ts         # Main application module
└── main.ts               # Application entry point
```

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: BCrypt for secure password storage
- **Input Validation**: Comprehensive validation using class-validator
- **Authorization Guards**: Protected routes with JWT verification
- **CORS Enabled**: Cross-origin resource sharing support

## Health Checks

The application includes basic health monitoring through:
- Database connection status
- Application startup validation
- Environment configuration validation

## Example Usage Flow

1. **Register a new user**:
```bash
curl -X POST http://localhost:3000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

2. **Login to get token**:
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

3. **Create a task**:
```bash
curl -X POST http://localhost:3000/task \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Security Review",
    "description":"Monthly security review",
    "framework":"DSALTA",
    "category":"MONITORING"
  }'
```

4. **Get all tasks**:
```bash
curl -X GET http://localhost:3000/task \
  -H "Authorization: Bearer YOUR-JWT-TOKEN"
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Author

**Ege Sabanci**  
Email: egesabanci@outlook.com.tr

---

For any questions or issues, please refer to the Swagger documentation at `/apidocs` or contact the author.
