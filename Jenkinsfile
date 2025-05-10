pipeline {
    agent any
    
    environment {
        // Используем GitHub Token вместо SSH
        GITHUB_TOKEN = credentials('github-token')  // ID ваших credentials в Jenkins
        DOCKER_HUB_CREDENTIALS = credentials('docker-hub-credentials')
    }
    
    stages {
        // Этап 0: Настройка Git
        stage('Configure Git') {
            steps {
                script {
                    echo '=== НАСТРОЙКА GIT ==='
                    // Устанавливаем безопасную директорию
                    sh 'git config --global --add safe.directory "*"'
                    // Настраиваем аутентификацию через токен
                    sh """
                        git config --global url."https://${GITHUB_TOKEN}@github.com".insteadOf "https://github.com"
                        git config --global user.name "Jenkins"
                        git config --global user.email "jenkins@example.com"
                    """
                }
            }
        }

        // Этап 1: Клонирование репозитория
        stage('Checkout SCM') {
            steps {
                script {
                    echo '=== КЛОНИРОВАНИЕ РЕПОЗИТОРИЯ ==='
                    checkout([
                        $class: 'GitSCM',
                        branches: [[name: '*/main']],
                        extensions: [
                            [$class: 'CleanBeforeCheckout'],
                            [$class: 'CloneOption', depth: 1, timeout: 30]
                        ],
                        userRemoteConfigs: [[
                            url: 'https://github.com/LonelyLake/tea-shop.git',
                            credentialsId: 'github-token'  // Должен совпадать с ID в environment
                        ]]
                    ])
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
        
        // Этап 3: Сборка бекенда
        stage('Build Backend') {
            steps {
                script {
                    echo '=== СОБОРКА БЕКЕНДА ==='
                    dir('backend') {
                        sh 'docker build -t tea-backend .'
                    }
                }
            }
        }
        
        // Этап 4: Запуск сервисов
        stage('Deploy Services') {
            steps {
                script {
                    echo '=== ЗАПУСК СЕРВИСОВ ==='
                    sh 'docker-compose down || true'
                    sh 'docker-compose up -d'
                }
            }
        }
        
        // Этап 5: Проверка
        stage('Health Check') {
            steps {
                script {
                    echo '=== ПРОВЕРКА РАБОТОСПОСОБНОСТИ ==='
                    sh 'sleep 10'  // Даем время для запуска контейнеров
                    sh 'curl -sSf http://localhost:8000/api/teas > /dev/null'
                }
            }
        }
    }
    
    post {
        always {
            echo '=== ОЧИСТКА И ЛОГИРОВАНИЕ ==='
            sh 'docker ps -a'
            sh 'docker-compose logs --tail=50 || true'
        }
        success {
            echo '✅ Деплой успешно завершен!'
            slackSend(color: 'good', message: "Успешный деплой: ${env.JOB_NAME} #${env.BUILD_NUMBER}")
        }
        failure {
            echo '❌ Ошибка при деплое!'
            slackSend(color: 'danger', message: "Сбой деплоя: ${env.JOB_NAME} #${env.BUILD_NUMBER}")
        }
    }
}