# ---------- Development ----------
    FROM node:20-alpine AS dev
    WORKDIR /app
    COPY package*.json ./
    RUN npm install
    COPY . .
    EXPOSE 5173
    # Make sure npm binaries are in the PATH
    ENV PATH /app/node_modules/.bin:$PATH
    CMD ["npm", "run", "dev"]
    
    # ---------- Production ----------
    FROM node:20-alpine AS build
    WORKDIR /app
    COPY . .
    RUN npm install && npm run build
    
    FROM nginx:alpine as prod
    COPY --from=build /app/dist /usr/share/nginx/html