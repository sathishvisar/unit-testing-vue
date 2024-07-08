# Use the official Node.js image.
FROM node:18.19.0

# Create and change to the app directory.
WORKDIR /home/unit-testing-vue

# Install Vue CLI globally
RUN npm install -g @vue/cli

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Install dependencies
RUN npm i

# Install production dependencies.
RUN npm install --only=production

# Copy local code to the container image.
COPY . .

# Run the web service on container startup.
CMD [ "npm", "run", "serve" ]

# Document that the service listens on port 8080.
EXPOSE 8081
