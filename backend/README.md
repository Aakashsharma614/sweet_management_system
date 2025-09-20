# Sweet Shop Backend

## Setup Instructions

1. **Install Dependencies**
   \`\`\`bash
   cd backend
   npm install
   \`\`\`

2. **Environment Variables**
   - Copy `.env.example` to `.env`
   - Update the MongoDB URI and JWT secret

3. **Start MongoDB**
   - Make sure MongoDB is running on your system
   - Default connection: `mongodb://localhost:27017/sweetshop`

4. **Run the Server**
   \`\`\`bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   \`\`\`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Sweets (Coming in next step)
- `GET /api/sweets` - Get all sweets
- `POST /api/sweets` - Add new sweet (protected)
- `GET /api/sweets/search` - Search sweets
- `PUT /api/sweets/:id` - Update sweet (protected)
- `DELETE /api/sweets/:id` - Delete sweet (admin only)
- `POST /api/sweets/:id/purchase` - Purchase sweet (protected)
- `POST /api/sweets/:id/restock` - Restock sweet (admin only)

## Default Admin User
After running the server, you can create an admin user by registering with `role: "admin"` in the request body.
