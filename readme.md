# GIF Browser Application

A full-stack application that allows users to browse and search for GIFs using the Giphy API.

```
 _
//\
V  \
 \  \_
  \,'.`-.
   |\ `. `.       
   ( \  `. `-.                        _,.-:\
    \ \   `.  `-._             __..--' ,-';/
     \ `.   `-.   `-..___..---'   _.--' ,'/
      `. `.    `-._        __..--'    ,' /
        `. `-_     ``--..''       _.-' ,'
          `-_ `-.___        __,--'   ,'
             `-.__  `----"""    __.-'
                `--..____..--'

```

## Features

- Browse trending GIFs from Giphy
- Search for GIFs by keyword
- Responsive design that works on mobile and desktop
- Clean, modern UI with loading states
- Backend API proxy for Giphy with caching
- Docker containerization for development and production

## Tech Stack

### Frontend
- React with TypeScript
- Vite for fast bundling and development
- CSS Grid for responsive layouts
- Axios for API requests

### Backend
- Node.js with Express
- TypeScript for type safety
- Zod for input validation
- Node-cache for request caching
- Pino for structured logging
- Docker for containerization

## Getting Started

### Prerequisites
- Node.js v20+ 
- Docker and Docker Compose
- Giphy API key (get one at [Giphy Developers](https://developers.giphy.com/))

### Environment Setup

1. Clone the repository
   ```
   git clone https://github.com/odaymardi/gif-browser.git
   cd gif-browser
   ```

2. Configure environment variables
   
   For the backend:
   ```
   cd backend
   cp .env.example .env
   ```
   Edit `.env` and add your Giphy API key
   
   For the frontend:
   ```
   cd ../frontend
   cp .env.example .env
   ```

### Running with Docker (Recommended)

For development:
```
docker-compose up
```

For production:
```
docker-compose -f docker-compose.prod.yml up
```

### Running without Docker

Backend:
```
cd backend
npm install
npm run dev
```

Frontend:
```
cd frontend
npm install
npm run dev
```

## API Endpoints

### GET /api/gifs/popular
Returns currently trending GIFs

Query Parameters:
- `limit` (optional): Number of results (default: 12, max: 50)
- `offset` (optional): Pagination offset (default: 0)

### GET /api/gifs/search
Searches for GIFs by keyword

Query Parameters:
- `q` (required): Search query
- `limit` (optional): Number of results (default: 12, max: 50)
- `offset` (optional): Pagination offset (default: 0)

### GET /api/metrics
Returns application metrics (cache hits, misses, etc.)

### GET /healthz
Health check endpoint

## Implementation Notes & Tradeoffs

### Backend Architecture
- **API Proxy Pattern**: The backend serves as a proxy to the Giphy API, providing several benefits:
  - API key protection
  - Response caching
  - Rate limiting
  - Standardized error handling
  - Data transformation

- **Caching Strategy**: Responses are cached for 5 minutes using node-cache, significantly reducing API calls for repeated searches.

- **Error Handling**: Centralized error handling middleware captures and formats all errors consistently.

- **Input Validation**: Zod schemas validate all input parameters before processing.

### Frontend Design

- **Component Structure**: Components are modular and focused on specific responsibilities.

- **CSS Organization**: Each component has its own CSS file for better maintainability.

- **State Management**: React's built-in useState and useEffect hooks handle state management, avoiding additional libraries for this simple application.

- **Responsive Design**: CSS Grid automatically adjusts the layout based on screen size.

### Tradeoffs

- **No Server-Side Rendering**: The application is client-rendered, which may impact initial load performance and SEO. For a GIF browser application, this tradeoff is acceptable.

- **Limited Test Coverage**: Basic unit tests are included, but more comprehensive testing could be implemented.

- **Simple State Management**: No Redux or other state management libraries are used, which is suitable for this app's complexity but might be limiting for larger applications.

- **No Pagination UI**: The API supports pagination, but the UI doesn't yet expose this functionality to users.

## Future Improvements

- Add pagination controls to navigate through more results
- Implement client-side caching of recently viewed GIFs
- Add a favorites feature to save preferred GIFs
- Implement user authentication
- Create a dark/light theme toggle
- Add a detail view for each GIF with more information
- Implement end-to-end tests with Cypress
- Add component tests using React Testing Library
- Set up CI/CD pipeline with GitHub Actions
- Add Swagger/OpenAPI documentation for the API
- Implement image lazy loading for better performance

