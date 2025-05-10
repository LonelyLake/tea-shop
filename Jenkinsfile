pipeline {
    agent any

    environment {
        GIT_CREDENTIALS = credentials('github-token')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build and Deploy') {
            steps {
                script {
                    sh '''
                        sed -i '/^version:/d' docker-compose.yml
                        docker-compose down || true
                        docker-compose build
                        docker-compose up -d
                    '''
                }
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh 'docker build -t tea-backend .'
                }
            }
        }
    }
}
