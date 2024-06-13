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
```
sudo apt-get update
sudo apt-get install docker.io

```
CentOS/RHEL:
```
sudo yum install docker

```
Fedora:
```
sudo dnf install docker

```

After installing Docker, start the Docker service:

```
sudo systemctl start docker

```
And enable it to start on boot:

```
sudo systemctl enable docker

```

# Step 2: Create a Dockerfile
Navigate to your project directory and create a Dockerfile. This file defines the environment for your Docker container.

Here's a basic example for a Node.js project:

Dockerfile
```
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
EXPOSE 8080

# Define the command to run the app
CMD ["npm", "run", "serve"]
```
# Step 2.1: Docker Login

```
docker login 

edit config - nano ~/.docker/config.json

{
  "auths": {
    "https://index.docker.io/v1/": {}
  }
}
```

# Step 3: Build the Docker Image
In your project directory where the Dockerfile is located, build the Docker image using the docker build command:

## copy code
```
docker build -t my-docker-project .

```
Replace my-docker-project with the desired name for your Docker image.

## Step 4: Run the Docker Container

```
docker run -d -p 8080:8080 my-docker-project

```
This command runs the Docker container in detached mode (-d) and maps port 8080 of the container to port 8080 on the host (-p 8080:8080).

```
docker run -d -p 8080:8080 my-docker-project:latest

```

# JinKins

## Step 1: Pull the Jenkins Docker Image
```
docker pull jenkins/jenkins:lts

```

## Step 2: Run the Jenkins Container

Run the Jenkins container, mapping port 8081 on your host to port 8080 on the Jenkins container.
```
docker run -d --name jenkins \
  -p 8081:8080 \
  -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  jenkins/jenkins:lts
  
```

### Jenkins default password
```
docker logs jenkins

*************************************************************

Jenkins initial setup is required. An admin user has been created and a password generated.
Please use the following password to proceed to installation:

abc123def456ghi789jkl012mno345pq

This may also be found at: /var/jenkins_home/secrets/initialAdminPassword

*************************************************************
```

## credentials
campaygn@Campaygn@2024#



# Firewall

## Using ufw (Uncomplicated Firewall) on Ubuntu/Debian:
```
sudo ufw allow 3001

```

## Using iptables:
If you're using a distribution that doesn't use ufw or firewalld, you can use iptables directly. Here's how you can allow traffic on port 3001 with iptables:
```
sudo iptables -A INPUT -p tcp --dport 3001 -j ACCEPT
sudo iptables-save | sudo tee /etc/sysconfig/iptables

```


## Verify Firewall Rules:
After applying the firewall rules, you can verify that port 3001 is open by running:

```
sudo ufw status            # For Ubuntu/Debian with ufw
sudo firewall-cmd --list   # For CentOS/RHEL with firewalld
sudo iptables -L           # For distributions using iptables directly

```