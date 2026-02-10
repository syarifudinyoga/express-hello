pipeline {
    agent any

    parameters {
        string(
            name: 'VERSION',
            defaultValue: '1.0.0',
            description: 'Docker image version'
        )
    }

    environment {
        DOCKER = "/usr/local/bin/docker"
        IMAGE_NAME = "syarifudinyoga/express-hello"
        // optional Slack webhook
        SLACK_WEBHOOK = credentials('slack-webhook') 
    }

    stages {
        stage('Install Dependencies') {
            steps {
                echo "Installing dependencies..."
                sh 'npm install'
            }
        }

        stage('Lint & Test') {
            steps {
                echo "Running lint and tests..."
                sh 'npm run lint || true'   // jangan gagal kalau lint warning
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "Building Docker image version ${params.VERSION}..."
                sh """
                  ${DOCKER} build -t ${IMAGE_NAME}:${params.VERSION} .
                  ${DOCKER} tag ${IMAGE_NAME}:${params.VERSION} ${IMAGE_NAME}:latest
                """
            }
        }

        stage('Login Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh """
                      echo "$DOCKER_PASS" | ${DOCKER} login -u "$DOCKER_USER" --password-stdin
                    """
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                echo "Pushing Docker image..."
                sh """
                  ${DOCKER} push ${IMAGE_NAME}:${params.VERSION}
                  ${DOCKER} push ${IMAGE_NAME}:latest
                """
            }
        }

        stage('Cleanup Docker') {
            steps {
                echo "Cleaning up old Docker images..."
                sh '${DOCKER} system prune -f'
            }
        }
    }

    post {
        success {
            echo "Build & Push sukses 🎉"
            slackSend(
                channel: '#docker-build',
                color: 'good',
                message: "Build sukses: ${IMAGE_NAME}:${params.VERSION}"
            )
        }
        failure {
            echo "Build gagal ❌"
            slackSend(
                channel: '#docker-build',
                color: 'danger',
                message: "Build gagal: ${IMAGE_NAME}:${params.VERSION}"
            )
        }
        always {
            echo "Pipeline selesai ✅"
        }
    }
}
