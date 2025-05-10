pipeline {
    agent any
    
    environment {
        DOCKER_HUB_CREDENTIALS = credentials('docker-hub-credentials')
    }
    
    stages {
        // Этап 0: Установка безопасной директории для Git
        stage('Setup Git Safe Directory') {
            steps {
                script {
                    echo '=== Настройка безопасной директории для Git ==='
                    sh 'git config --global --add safe.directory /var/jenkins_home/workspace/tea-shop'
                }
            }
        }

        // Этап 1: Клонирование репозитория (если еще не клонирован)
        stage('Checkout SCM') {
            steps {
                script {
                    echo '=== Клонирование репозитория ==='
                    checkout scm
                }
            }
        }

        // Этап 2: Сборка фронтенда
        stage('Build Frontend') {
            steps {
                script {
                    echo '=== СБОРКА FRONTEND ==='
                    dir('frontend') {
                        sh 'npm install'
                        sh 'npm run build'
                    }
                }
            }
        }
        
        // Этап 3: Сборка и запуск бекенда
        stage('Deploy Backend') {
            steps {
                script {
                    echo '=== ЗАПУСК БЕКЕНДА ==='
                    dir('backend') {
                        sh 'docker build -t tea-backend .'
                    }
                    sh 'docker-compose down || true'
                    sh 'docker-compose up -d'
                }
            }
        }
        
        // Этап 4: Проверка работоспособности
        stage('Health Check') {
            steps {
                script {
                    echo '=== ПРОВЕРКА СЕРВИСОВ ==='
                    sh 'curl -I http://localhost:8000/api/teas || true'
                }
            }
        }
    }
    
    post {
        always {
            echo '=== ОЧИСТКА РЕСУРСОВ ==='
            sh 'docker system prune -f'
        }
        success {
            echo 'Деплой успешно завершен!'
        }
        failure {
            echo 'Ошибка при деплое!'
        }
    }
}
