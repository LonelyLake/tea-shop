pipeline {
    agent any

    environment {
        GIT_CREDENTIALS = credentials('github-token')
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    extensions: [],
                    userRemoteConfigs: [[
                        url: 'https://github.com/LonelyLake/tea-shop.git',
                        credentialsId: 'github-token'
                    ]]
                ])
            }
        }

        stage('Prepare Environment') {
            steps {
                sh '''
                    # Удаляем устаревший version из docker-compose.yml
                    if [ -f docker-compose.yml ]; then
                        sed -i '/^version:/d' docker-compose.yml
                    fi
                '''
            }
        }

        stage('Build and Deploy') {
            steps {
                sh '''
                    # Используем современный docker compose (без дефиса)
                    docker compose down || true
                    docker compose build
                    docker compose up -d --force-recreate
                '''
            }
        }
    }

    post {
        failure {
            echo 'Pipeline failed!'
            // Можно добавить уведомления
        }
        success {
            echo 'Pipeline succeeded!'
            // Можно добавить уведомления
        }
    }
}