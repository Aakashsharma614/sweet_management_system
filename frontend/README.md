# Sweet Shop Frontend

## Setup Instructions

1. **Install Dependencies**
   \`\`\`bash
   cd frontend
   npm install
   \`\`\`

2. **Start the Development Server**
   \`\`\`bash
   npm start
   \`\`\`

   The app will open at [http://localhost:3000](http://localhost:3000)

3. **Build for Production**
   \`\`\`bash
   npm run build
   \`\`\`

## Project Structure

- `src/components/` - Reusable React components
- `src/pages/` - Page components
- `src/contexts/` - React context providers
- `src/services/` - API service functions
- `src/utils/` - Utility functions

## Features

- User authentication (login/register)
- Sweet shop dashboard
- Admin panel for managing sweets
- Responsive design
- Toast notifications
- Protected routes

## API Integration

The frontend communicates with the backend API running on port 5000. Make sure the backend server is running before starting the frontend.
