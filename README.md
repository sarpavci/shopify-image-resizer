# Shopify Image Resizer

A TypeScript-based application for resizing and optimizing images for Shopify stores. This tool helps automate the process of preparing images according to Shopify's recommended specifications.

## Video Demo
<a href="https://drive.google.com/file/d/1wm-nCMkgGSsUOWgtSHkoS4A7ZhDcaIyt/view?usp=sharing" target="_blank">📹 See video demo </a>

## Project Structure

The project follows a typical React + Express.js structure:

```
apps/
├── api/
│   ├── src/
│   │   ├── actions/        # Contains business logic and API route handlers
│   │   ├── lib/           # Shared utilities and helper functions for the API
│   │   ├── types/         # TypeScript type definitions and interfaces
│   │   └── main.ts        # Entry point of the API application
│   ├── uploads/          # Directory for handling file uploads
│   ├── .env.example      # Template for environment variables
│   ├── .gitignore        # Specifies which files Git should ignore
│   ├── package.json      # API project dependencies and scripts
│   ├── tsconfig.json     # TypeScript configuration
│   ├── tsconfig.app.json # App-specific TypeScript settings
│   ├── webpack.config.js # Webpack bundler configuration
│   └── eslint.config.mjs # ESLint configuration for code style
│
└── web/
    ├── src/
    │   ├── app/          # Core application components and layouts
    │   ├── components/   # Reusable React components
    │   ├── constants/    # Application-wide constants and configurations
    │   ├── lib/         # Shared utilities and helper functions
    │   ├── providers/   # React context providers (e.g., auth, theme)
    │   ├── queries/     # GraphQL queries and mutations
    │   ├── store/       # State management using Zustand
    │   ├── types/       # TypeScript type definitions
    │   └── main.tsx     # Entry point of the React application
    ├── public/          # Static assets and public files
    ├── index.html       # HTML entry point
    ├── .env.example     # Template for environment variables
    ├── package.json     # Frontend project dependencies and scripts
    ├── tsconfig.json    # TypeScript configuration
    ├── tsconfig.app.json # App-specific TypeScript settings
    ├── vite.config.ts   # Vite bundler configuration
    └── eslint.config.mjs # ESLint configuration for code style
```

## How to Install

1. Ensure you have Node.js (compatible with TypeScript 5.8.2) installed on your system
2. Clone the repository:
   ```bash
   git clone https://github.com/sarpavci/shopify-image-resizer
   ```
   ```bash
   cd shopify-image-resizer
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## How to Configure

1. Copy the `.env.example` file and rename it to `.env` in both the API and WEB projects. Then update the variables if necessary.
   ```
   SHOPIFY_SHOP_NAME=your-shop-name
   SHOPIFY_SHOP_SLUG=your-shop-slug
   SHOPIFY_CLIENT_ID=your-api-key
   SHOPIFY_CLIENT_SECRET=your-api-secret
   SESSION_SECRET=your-session-secret
   ```

2. Configure Shopify App:
   - Register a new app in your Shopify Partner account
   - Set the OAuth callback URL in your Shopify app settings
   - Update the API credentials in your `.env` file

## How to Run

### Development Mode

1. Start the development server:
   ```bash
   npm run dev
   ```
   This will start both the frontend and backend in development mode.

2. Access the application:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:3001](http://localhost:3001)

### The application uses:
- React 18.0.0 for the frontend
- Express 4.21.2 for the backend
- TypeScript 5.8.2
- Shopify Admin API Client
- Apollo Client for GraphQL operations
- Zustand for state management
- React Advanced Cropper for image manipulation on the client-side
- sharp for image manipulation on the server-side

## Requirements
- Node.js
- npm package manager
- Shopify Partner account
- Shopify development store (for testing)