pipeline {
    agent any

    environment {
        GIT_CREDENTIALS = credentials('github-token')
    }

    stages {
        stage('Clone repo') {
            steps {
                git branch: 'main', url: 'https://github.com/LonelyLake/tea-shop.git', credentialsId: 'github-token'
            }
        }

        stage('Build and Run') {
            steps {
                script {
                    // Убедиться, что docker-compose файл на месте
                    sh 'docker-compose down || true'
                    sh 'docker-compose build'
                    sh 'docker-compose up -d'
                }
            }
        }

        stage('Build Backend') {
            steps {
                sh 'cd backend && docker build -t tea-backend .'
            }
        }
    }
}
