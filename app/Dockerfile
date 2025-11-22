# Stage 1: Build the Vite application
FROM node:20-alpine as builder

WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to leverage Docker cache
COPY package.json ./
# If using yarn, copy yarn.lock instead: COPY yarn.lock ./
RUN npm install # Or yarn install if using yarn

# Copy the rest of the application code
COPY . .

# Build the Vite application for production
RUN npm run build # Or yarn build if using yarn

# Stage 2: Serve the static files with a lightweight web server (e.g., Nginx)
FROM nginx:alpine

# Copy the built static files from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 for the web server
EXPOSE 80

# Command to start Nginx
CMD ["nginx", "-g", "daemon off;"]
