pipeline {
    agent any

    tools {
        nodejs "NodeJS 18.19.0"
    }

    environment {
        CI = 'true'
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
                            credentialsId: '2fcf341a-63ca-4942-96b0-ff92262414f6' // Replace with your actual credentialsId
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
                    // Configure Git user
                    sh '''
                        git config --global user.email "dev@campaygn.com"
                        git config --global user.name "dev_campaygn"
                    '''

                    // Checkout the target branch
                    sh '''
                        git checkout master
                        git pull origin master
                    '''

                    // Merge the current branch into the target branch
                    sh '''
                        git merge ${env.CHANGE_BRANCH ?: env.BRANCH_NAME} --no-ff -m "Merge branch ${env.CHANGE_BRANCH ?: env.BRANCH_NAME} into master"
                    '''

                    // Push the changes to the remote repository
                    sh '''
                        git push origin master
                    '''

                    // Build and deploy Docker image
                    // def dockerImageName = "sathishvisar/unit-testing-vue"
                    // def dockerImageTag = "${env.BUILD_NUMBER}"

                    // Build Docker image
                    // sh "docker build -t ${dockerImageName}:${dockerImageTag} ."

                    // // Push Docker image to Docker Hub (optional)
                    // withCredentials([string(credentialsId: '2fcf341a-63ca-4942-96b0-ff92262414f6', variable: 'DOCKERHUB_PASSWORD')]) {
                    //     sh '''
                    //         echo ${DOCKERHUB_PASSWORD} | docker login -u sathishvisar --password-stdin
                    //         docker push ${dockerImageName}:${dockerImageTag}
                    //     '''
                    // }

                    // // Deploy Docker container
                    // sh '''
                    //     docker run -d --name unit-testing-vue-${dockerImageTag} -p 80:80 ${dockerImageName}:${dockerImageTag}
                    // '''
                } else {
                    echo 'Deployment aborted by the user.'
                }
            }
        }
    }
}
