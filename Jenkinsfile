pipeline {
    agent any

    environment {
        GIT_CREDENTIALS = credentials('github-token')
    }

    stages {
        stage('Clone repo') {
            steps {
                git url: 'https://github.com/LonelyLake/tea-shop.git', credentialsId: 'github-token'
            }
        }
        stage('Build Backend') {
            steps {
                sh 'cd backend && docker build -t tea-backend .'
            }
        }
        stage('Run Containers') {
            steps {
                sh 'docker-compose down || true'
                sh 'docker-compose up -d'
            }
        }
    }
}
