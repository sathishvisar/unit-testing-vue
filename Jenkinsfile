pipeline {
    agent any

    tools {
        nodejs "NodeJS 18.19.0"
    }

    environment {
        CI = 'true'
    }

    triggers {
        echo "githubPush"
        githubPush()
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    echo "githubPush"
                    echo env
                    // Check if this is a pull request event and target is master
                    if (env.CHANGE_ID && env.CHANGE_TARGET == 'master') {
                        def repoUrl = 'https://github.com/sathishvisar/unit-testing-vue.git'
                        def sourceBranch = env.CHANGE_BRANCH ?: 'master' // Default to master if branch not found
                        checkout([
                            $class: 'GitSCM',
                            branches: [[name: "refs/pull/${env.CHANGE_ID}/head"]],
                            userRemoteConfigs: [[url: repoUrl, refspec: "+refs/pull/${env.CHANGE_ID}/head:refs/remotes/origin/pr/${env.CHANGE_ID}"]]
                        ])
                    } else {
                        echo "Not a new pull request targeting master, skipping build."
                        currentBuild.result = 'SUCCESS'
                        return
                    }
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
