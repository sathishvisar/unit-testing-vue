# Use the official Node.js image.
FROM node:18.19.0

# Create and change to the app directory.
WORKDIR /home/unit-testing-vue

# Git checkout master and pull latest changes from origin master
RUN git stash && git checkout master && git pull origin master

# Install Vue CLI globally
RUN npm install -g @vue/cli

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Install dependencies
RUN npm i

# Install production dependencies.
RUN npm install --only=production

# # Build the application
# RUN npm run build 

# # Remove all files from directory B and copy files from directory A to B
# # RUN rm -rf /home/unit-testing-vue/dist/release/* && cp -r /home/unit-testing-vue/dist/* /home/unit-testing-vue/dist/release
# RUN rm -rf release/* && cp -r dist/* release

# Copy local code to the container image.
COPY . .

# Run the web service on container startup.
CMD [ "npm", "run", "serve" ]

# Document that the service listens on port 8080.
EXPOSE 8081
