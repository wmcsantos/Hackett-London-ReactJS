# === Base stage for development ===
FROM node:23 AS dev

WORKDIR /app

# Copy package.json and package-lock.json first (better caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Install tailwindcss and @tailwindcss/postcss globally to avoid issues
RUN npm install -g tailwindcss @tailwindcss/postcss

# Copy the entire frontend code
COPY . .

# Expose port 3000 for development
EXPOSE 3000

CMD ["npm", "start"]

# === Production stage ===
FROM node:23 AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install
COPY . .

# Build the static files
RUN npm run build

# === Serve with Nginx ===
FROM nginx:latest

# Copy the built files to Nginx
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for production
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
