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
                            url: 'git@github.com:sathishvisar/unit-testing-vue.git',
                            credentialsId: 'c641a456-21ac-43a9-a422-7809a0488410' // Replace with your actual credentialsId
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
                    def GIT_USEREMAIL = 'sathish.visar@gmail.com'
                    def GIT_USERNAME = 'sathishvisar'
                    def GIT_PASSWORD = 'Sathish@2282#'

                    sh """
                        git config --global user.email '${GIT_USEREMAIL}'
                        git config --global user.name '${GIT_USERNAME}'
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
                    
                    // Deploy to Docker
                    echo 'Deploy to Docker'
                 
                } else {
                    echo 'Deployment aborted by the user.'
                }
            }
        }
    }
}
