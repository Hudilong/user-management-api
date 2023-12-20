# Express TypeScript Server Template

This project is an Express server template implemented in TypeScript, designed for applications that require both GraphQL and RESTful API endpoints. It uses Docker for easy setup and scalability, and includes robust user management capabilities.

## Features

- **Docker-Compose Setup**: Includes `node`, `postgres`, and `redis` containers for a comprehensive development environment.
- **GraphQL and RESTful Endpoints**: A hybrid approach to offer flexibility in API consumption. ApolloServer is used for GraphQL
- **User Management**: Admin routes for CRUD operations on users and account management routes for regular users.
- **Session Management**: Utilizes JWT with a blacklist maintained in Redis for secure and efficient session handling.
- **MVC Architecture**: Structured with routers, controllers, services, and repositories for organized and maintainable code.
- **Custom Error Handling**: Implements custom error classes and an error handling middleware for clear and consistent error responses.
- **Security**: Integrated with `helmet`, `cors`, and `express-rate-limiter` for enhanced security measures.
- **Authentication and Authorization**: Custom middleware to manage access control and user verification.

## Getting Started

### Prerequisites

- Docker and Docker Compose

### Setup and Installation

1. **Clone the Repository**:
   ```sh
   git clone https://github.com/Hudilong/user-management-template.git
   cd user-management-template
   ```
2. **Start Docker Compose**:
   ```sh
   docker-compose up --d
   ```
## Accessing the Application

- The server will be running at `http://localhost:PORT` (replace `PORT` with the port you've configured).
- Access the GraphQL playground at `http://localhost:PORT/graphql`.
- RESTful endpoints can be accessed via `http://localhost:PORT/`.

## Usage

### User CRUD Routes

- `POST /users`: Create a new user. -- `Admin` `Authenticated`
- `GET /users`: Retrieve all users. -- `Authenticated`
- `GET /users/:id`: Get a specific user. -- `Authenticated`
- `PUT /users/:id`: Update a specific user. -- `Admin` `Authenticated`
- `DELETE /users/:id`: Delete a specific user. -- `Admin` `Authenticated`

### Account Management Routes

- `GET /me`: Retrieve the current user info. -- `Authenticated`
- `POST /me`: Register a new user account.
- `PUT /me`: Update the current user info.  -- `Authenticated`
- `DELETE /me`: Delete the current user account. -- `Authenticated`


### Auth Routes

- `POST /auth/login`: Login to a user account.
- `POST /auth/logout`: Logout from user account. -- `Authenticated`
- `POST /auth/refresh`: Get a new refresh token.

## Environment Variables

- `NODE_ENV`: Environment -- development or production.
- `POSTGRES_USER`: Postgres user.
- `POSTGRES_PASSWORD`: Postgres password.
- `POSTGRES_DB`: Database name.
- `PG_HOST`: Should be the same as postgres container_name in docker-compose
- `JWT_ACCESS_SECRET`: Secret key for JWT.
- `JWT_REFRESH_SECRET`: Secret key for refresh JWT.
- `PORT`: Port: Should be the same as in docker-compost

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

Ian Hudicourt - [ihudicourt@gmail.com](mailto:ihudicourt@gmail.com)
