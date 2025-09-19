
# TicketAra Backend Server

This is the backend server for the TicketAra application.

## Setup Instructions

1. Create a MySQL database named `ticketara`.
2. Run the SQL script in `db_setup.sql` to create the necessary tables and sample data.
3. Create a `.env` file based on the `.env.example` file:
   ```
   PORT=5000
   DB_HOST=localhost
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_NAME=ticketara
   JWT_SECRET=a_secure_random_string
   ```
4. Install dependencies:
   ```
   npm install
   ```
5. Start the server:
   ```
   node index.js
   ```

## API Endpoints

### Authentication
- `POST /api/signup` - Register a new user
- `POST /api/login` - Login a user
- `GET /api/me` - Get current user info (requires authentication)

### Tickets
- `POST /api/tickets/purchase` - Purchase tickets (requires authentication)
- `GET /api/tickets` - Get user's purchased tickets (requires authentication)

## Environment Variables

- `PORT` - Port the server runs on (default: 5000)
- `DB_HOST` - MySQL database host
- `DB_USER` - MySQL database user
- `DB_PASSWORD` - MySQL database password
- `DB_NAME` - MySQL database name
- `JWT_SECRET` - Secret key for JWT token generation
