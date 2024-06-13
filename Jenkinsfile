pipeline {
    agent any

    environment {
        NODE_VERSION = '18.19.0'
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/sathishvisar/unit-testing-vue.git'
            }
        }

        stage('Install Node.js') {
            steps {
                script {
                    def nodeHome = tool name: "NodeJS ${NODE_VERSION}", type: 'NodeJSInstallation'
                    env.PATH = "${nodeHome}/bin:${env.PATH}"
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm run test:unit'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Docker Build') {
            steps {
                script {
                    docker.build('unit-testing-vue:latest')
                }
            }
        }

        stage('Docker Run') {
            steps {
                script {
                    docker.run('unit-testing-vue:latest', '-p 8081:8080')
                }
            }
        }
    }
}
