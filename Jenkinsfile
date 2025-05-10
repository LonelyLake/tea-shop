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
                    // Удаляем устаревший атрибут version из docker-compose.yml
                    sh '''
                        # Убираем 'version:' только если это необходимо
                        sed -i '/^version:/d' docker-compose.yml

                        # Запускаем команды docker-compose
                        docker-compose down || true
                        docker-compose build
                        docker-compose up -d
                    '''
                }
            }
        }

        stage('Build Backend') {
            steps {
                script {
                    // Переходим в папку backend и строим Docker образ
                    dir('backend') {
                        sh 'docker build -t tea-backend .'
                    }
                }
            }
        }
    }
}