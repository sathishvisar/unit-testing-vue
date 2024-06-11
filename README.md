# unit-testing-vue

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



Setting up a Docker project in Linux involves several steps, including installing Docker, creating a Dockerfile, and possibly a docker-compose.yml file for multi-container setups. Here's a step-by-step guide:

Step 1: Install Docker
First, you need to install Docker on your Linux system. The method varies depending on your Linux distribution. Here's how you can do it for some popular distributions:

Ubuntu/Debian:
sh
Copy code
sudo apt-get update
sudo apt-get install docker.io
CentOS/RHEL:
sh
Copy code
sudo yum install docker
Fedora:
sh
Copy code
sudo dnf install docker
After installing Docker, start the Docker service:

sh
Copy code
sudo systemctl start docker
And enable it to start on boot:

sh
Copy code
sudo systemctl enable docker
Step 2: Create a Dockerfile
Navigate to your project directory and create a Dockerfile. This file defines the environment for your Docker container.

Here's a basic example for a Node.js project:

Dockerfile
Copy code
# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app
CMD ["npm", "start"]
Step 3: Build the Docker Image
In your project directory where the Dockerfile is located, build the Docker image using the docker build command:

sh
Copy code
docker build -t my-docker-project .
Replace my-docker-project with the desired name for your Docker image.

Step 4: Run the Docker Container
Once the Docker image is built, you can run a Docker container based on that image:

sh
Copy code
docker run -d -p 3000:3000 my-docker-project
This command runs the Docker container in detached mode (-d) and maps port 3000 of the container to port 3000 on the host (-p 3000:3000).