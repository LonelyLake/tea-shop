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

        stage('Build and Deploy') {
                steps {
                    script {
                        // Используем полные пути к бинарникам
                        sh '/usr/bin/docker compose down || true'
                        sh '/usr/bin/docker compose build'
                        sh '/usr/bin/docker compose up -d'
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
