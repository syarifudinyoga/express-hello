pipeline {
    agent any

    stages {
        stage('Check Docker') {
            steps {
                sh '/usr/local/bin/docker --version'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '/usr/local/bin/docker build -t syarifudinyoga/express-hello:latest .'
            }
        }
    }
}
