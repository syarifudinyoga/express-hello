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
        IMAGE_NAME = 'syarifudinyoga/express-hello'
    }

    stages {
        stage('Build Image') {
            steps {
                sh """
                  docker build -t ${IMAGE_NAME}:${VERSION} .
                  docker tag ${IMAGE_NAME}:${VERSION} ${IMAGE_NAME}:latest
                """
            }
        }

        stage('Login Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'e8e2a09a-fa6d-486e-87b6-5bc99e1c232b',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh """
                      echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                    """
                }
            }
        }

        stage('Push Image') {
            steps {
                sh """
                  docker push ${IMAGE_NAME}:${VERSION}
                  docker push ${IMAGE_NAME}:latest
                """
            }
        }
    }
}
