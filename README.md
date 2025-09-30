# SRKE Educational Society Backend

A Node.js/Express backend API for the SRKE Educational Society website with Supabase integration.

## Features

- Express.js REST API
- TypeScript support
- Prisma ORM with PostgreSQL
- Supabase integration
- CORS enabled for frontend
- Contact form handling
- Volunteer registration
- Donation tracking

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm
- PostgreSQL database (Supabase)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create a `.env` file with:
```env
DATABASE_URL="your-postgresql-connection-string"
SUPABASE_URL="your-supabase-url"
SUPABASE_ANON_KEY="your-supabase-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3001
```

3. Run database migrations:
```bash
npx prisma migrate deploy
```

4. Start the development server:
```bash
npm run dev
```

The server will start on http://localhost:5000

## API Endpoints

- `GET /api/health` - Health check
- `POST /api/contact` - Submit contact form
- `POST /api/join-us` - Volunteer registration
- `POST /api/donations` - Donation tracking

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **Storage**: Supabase Storage
