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
