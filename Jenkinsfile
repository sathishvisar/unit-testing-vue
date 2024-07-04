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

                    // Determine target branch name (default to 'main')
                    def targetBranch = 'master' // Change to 'master' if your repository still uses 'master'
                    def branchName = env.CHANGE_BRANCH ?: env.BRANCH_NAME

                    // Checkout the target branch
                    sh '''
                        git checkout ${targetBranch}
                        git pull origin ${targetBranch}
                    '''

                    echo branchName
                    echo targetBranch

                    // Push the changes to the remote repository
                    sh """
                        git merge origin/${branchName} --no-ff -m 'Merge branch ${branchName} into main'

                        git push origin ${targetBranch}
                    """

                 
                } else {
                    echo 'Deployment aborted by the user.'
                }
            }
        }
    }
}
