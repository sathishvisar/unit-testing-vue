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
            script {
                def branch = env.CHANGE_BRANCH ?: 'master'
                git branch: branch, url: 'https://github.com/sathishvisar/unit-testing-vue.git'
            }
            // steps {
            //     git branch: '${env.CHANGE_TARGET}', url: 'https://github.com/sathishvisar/unit-testing-vue.git'
            // }
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
        always {
            junit 'path/to/test-results.xml' // Adjust the path to your test results
        }
        success {
            echo 'Unit tests passed!'
        }
        failure {
            echo 'Unit tests failed!'
        }
    }
}
