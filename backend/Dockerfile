# Development
FROM node:20-alpine AS dev
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Make sure npm binaries are in the PATH
ENV PATH /app/node_modules/.bin:$PATH
CMD ["npm", "run", "dev"]

# Production build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production runtime
FROM node:20-alpine AS prod
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY package*.json ./
RUN npm install --only=production
ENV NODE_ENV=production
CMD ["npm", "start"]