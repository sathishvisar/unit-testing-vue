pipeline {
    agent any

    tools {
        nodejs "NodeJS 18.19.0"
    }

    environment {
        CI = 'true'
        GIT_SSH_COMMAND = "ssh -i /var/jenkins_home/.ssh/id_rsa -o StrictHostKeyChecking=no"
        DOCKER_CREDENTIALS = "cad86e44-afa1-476e-aedd-6d45655cce50"
    }

    triggers {
        githubPush()
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the branch or PR that triggered the build
                script {
                    checkout([
                        $class: 'GitSCM',
                        branches: [[name: "${env.CHANGE_BRANCH ?: env.BRANCH_NAME}"]],
                        userRemoteConfigs: [[
                            url: 'https://github.com/sathishvisar/unit-testing-vue.git',
                            credentialsId: 'cad86e44-afa1-476e-aedd-6d45655cce50'
                        ]]
                    ])
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run ESLint') {
            steps {
                sh 'npm run lint'
            }
        }

        stage('Run Unit Tests') {
            steps {
                sh 'npm run test:unit'
            }
        }
    }

    post {
        success {
            echo 'Unit tests passed!'

            script {
                def userInput = input(
                    message: 'Do you want to proceed with the merge and deployment?',
                    parameters: [booleanParam(defaultValue: true, description: '', name: 'Proceed')]
                )

                if (userInput) {
                    /**
                    // Configure Git user
                    def GIT_USEREMAIL = 'sathish.visar@gmail.com'
                    def GIT_USERNAME = 'sathishvisar'
                    def GIT_PASSWORD = 'Sathish2282'

                    sh """
                        git config --global user.email '${GIT_USEREMAIL}'
                        git config --global user.name '${GIT_USERNAME}'
                        git remote set-url origin git@github.com:sathishvisar/unit-testing-vue.git
                    """

                    // Determine target branch name (default to 'master')
                    def targetBranch = 'master'
                    def branchName = env.CHANGE_BRANCH ?: env.BRANCH_NAME

                    echo "Current branch: ${branchName}"
                    echo "Target branch: ${targetBranch}"
                    
                    // Fetch all branches to ensure the target branch is up to date
                    sh 'git fetch origin'
                    
                    // Checkout the target branch
                    sh "git checkout ${targetBranch} || git checkout -b ${targetBranch} origin/${targetBranch}"
                    sh "git pull origin ${targetBranch}"
                    
                    // Merge the current branch into the target branch
                    sh "git merge origin/${branchName} --no-ff -m 'Merge branch ${branchName} into ${targetBranch}' || true"

                    // Push the changes to the remote repository
                    sh "git push origin ${targetBranch}"
                    
                    // Deploy to Docker (add your deployment steps here)
                    echo 'Deploy to Docker'
                    **/

                    /**
                    // Example Docker commands:
                    def dockerImage = "my-docker-project:latest"
                    def containerName = "my-docker-project"
                    def dockerFilePath = "/home/unit-testing-vue/Dockerfile"

                    // Build Docker image
                    docker.build(dockerImage, "-f ${dockerFilePath} .")

                    // Stop and remove the existing container (if any)
                    sh "docker stop ${containerName} || true"
                    sh "docker rm ${containerName} || true"

                    // Run the new container with a different name and expose ports
                    sh "docker run -d -p 8081:8080 --name ${containerName} ${dockerImage}"
                    **/
                    sh "git checkout master && npm install && npm run build && mkdir -p release && rm -rf release/* && cp -r dist/* release && pm2 restart myapp"
                } else {
                    echo 'Deployment aborted by the user.'
                }
            }
        }
    }
}

// git checkout master && npm install && npm run build && mkdir -p release && rm -rf release/* && cp -r dist/* release && pm2 restart myapp
/*
pm2 serve . 80 --name myapp

pm2 start serve --name myapp -- -s release -l 5000

pm2 start serve --name myapp -s release -p 80

pm2 start serve --name myapp -s /home/unit-testing-vue/release -p 80

docker run -d -p 8080:8080 -p 50000:50000 \
  -v /path/to/.ssh:/var/jenkins_home/.ssh \
  -v jenkins-ssh-keys:/var/jenkins_home \
  --name jenkins jenkins/jenkins:lts



docker run -d --name jenkins \
  -p 8081:8080 \
  -p 50000:50000 \
  -v /root/.ssh:/var/jenkins_home/.ssh \
  -v jenkins_home:/var/jenkins_home \
  jenkins/jenkins:lts
  
docker exec -u 0 -it jenkins bash

root@7c7caeaef0f1:/# eval $(ssh-agent -s)
ssh-add /var/jenkins_home/.ssh/id_rsa

Agent pid 328
Identity added: /var/jenkins_home/.ssh/id_rsa (root@scraping-api)
root@7c7caeaef0f1:/# cat /var/jenkins_home/.ssh/known_hosts

Check permissions:
sudo chown -R jenkins:jenkins /var/jenkins_home/.ssh
sudo chmod 700 /var/jenkins_home/.ssh
sudo chmod 600 /var/jenkins_home/.ssh/*

Test SSH Connection:
ssh -i /var/jenkins_home/.ssh/id_rsa git@github.com




// Build Docker image
// sh """
//     docker build -t my-docker-project:latest -f /home/unit-testing-vue/Dockerfile .
// """

// Run Docker container
// sh """
//     docker stop my-docker-project || true
//     docker rm my-docker-project || true
//     docker run -d -p 8081:8080 --name my-docker-project my-docker-project:latest
// """

// sh """
//     docker stop my-docker-project
//     docker rm my-docker-project
//     docker run -d -p 8081:8080 my-docker-project
// """

// def dockerFilePath = '/home/unit-testing-vue/Dockerfile'
// // Build Docker image
// docker.build("my-docker-project:latest", "-f ${dockerFilePath} .").inside {
//     // Run Docker container
//     sh "docker run -d -p 8081:8080 my-docker-project:latest"
// }
*/