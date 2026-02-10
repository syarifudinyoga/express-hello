pipeline {
    agent any

    // Input parameter untuk versi Docker image
    parameters {
        string(
            name: 'VERSION',
            defaultValue: '1.0.0',
            description: 'Docker image version (e.g., 1.0.0)'
        )
    }

    environment {
        // Path Docker di macOS (sesuaikan kalau beda)
        DOCKER = "/usr/local/bin/docker"
        // Nama image Docker
        IMAGE_NAME = "syarifudinyoga/express-hello"
    }

    stages {
        stage('Build Image') {
            steps {
                sh """
                  echo "Building Docker image ${IMAGE_NAME}:${params.VERSION}"
                  $DOCKER build -t ${IMAGE_NAME}:${params.VERSION} .
                  $DOCKER tag ${IMAGE_NAME}:${params.VERSION} ${IMAGE_NAME}:latest
                """
            }
        }

        stage('Login Docker Hub') {
            steps {
                // Gunakan credential ID yang sudah ada di Jenkins
                withCredentials([usernamePassword(
                    credentialsId: 'e8e2a09a-fa6d-486e-87b6-5bc99e1c232b', 
                    usernameVariable: 'DOCKER_USER', 
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh """
                      echo "Logging in to Docker Hub"
                      echo "$DOCKER_PASS" | $DOCKER login -u "$DOCKER_USER" --password-stdin
                    """
                }
            }
        }

        stage('Push Image') {
            steps {
                sh """
                  echo "Pushing Docker image ${IMAGE_NAME}:${params.VERSION}"
                  $DOCKER push ${IMAGE_NAME}:${params.VERSION}
                  $DOCKER push ${IMAGE_NAME}:latest
                """
            }
        }
    }

    post {
        success {
            echo "Docker image pushed successfully: ${IMAGE_NAME}:${params.VERSION}"
        }
        failure {
            echo "Build failed!"
        }
    }
}
