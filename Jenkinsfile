pipeline {
    agent any

    environment {
        GIT_CREDENTIALS = credentials('github-token')
    }

    stages {
        stage('Clone repo') {
            steps {
                git branch: 'main', url: 'https://github.com/LonelyLake/tea-shop', credentialsId: 'github-token'
            }
        }

        stage('Build and Deploy') {
            steps {
                script {
                    // Удаляем устаревший атрибут version из docker-compose.yml
                    sh '''
                        sed -i '/^version:/d' docker-compose.yml
                        docker compose down || true
                        docker compose build
                        docker compose up -d
                    '''
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
