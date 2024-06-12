pipeline {
    agent {
        node {
            label 'docker'
        }
    }
    environment {
        CI = 'true'
    }
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/sathishvisar/unit-testing-vue.git'
            }
        }
        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Run tests') {
            steps {
                sh 'npm test'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
}