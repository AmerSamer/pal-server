# Property Manager Backend

A NestJS backend service for managing properties with user authentication and PostgreSQL database.

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=property_manager
JWT_SECRET=your_jwt_secret_key
PORT=3000
```

3. Create PostgreSQL database:
```bash
createdb property_manager
```

4. Start the server:
```bash
npm run start:dev
```

## API Endpoints

### Auth
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user

### Properties (requires JWT)
- `GET /properties` - List user's properties
- `GET /properties/:id` - Get property details
- `POST /properties` - Create new property
- `PUT /properties/:id` - Update property
- `DELETE /properties/:id` - Delete property

## Development

```bash
npm run start:dev    # Development mode
npm run build       # Build for production
npm run format      # Format code
npm run lint        # Lint code
```

## Tech Stack

- NestJS
- TypeScript
- PostgreSQL
- TypeORM
- JWT Authentication
- bcrypt for password hashing
