pipeline {
    agent any

    environment {
        DOCKER = "/usr/local/bin/docker"
        IMAGE_NAME = "syarifudinyoga/express-hello:latest"
    }

    stages {
        stage('Build Image') {
            steps {
                sh "$DOCKER build -t $IMAGE_NAME ."
            }
        }

        stage('Login Docker Hub') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {
                    sh '''
                        echo "$DOCKER_PASS" | /usr/local/bin/docker login \
                        -u "$DOCKER_USER" --password-stdin
                    '''
                }
            }
        }

        stage('Push Image') {
            steps {
                sh "$DOCKER push $IMAGE_NAME"
            }
        }
    }
}
