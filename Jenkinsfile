pipeline {
    agent any

    tools {
        nodejs "NodeJS 18.19.0"
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/sathishvisar/unit-testing-vue.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Unit Tests') {
            steps {
                sh 'npm run test:unit'
            }
        }
    }
}
