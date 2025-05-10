pipeline {
    agent any
    
    options {
        timeout(time: 30, unit: 'MINUTES')
        retry(2) // Повторять весь пайплайн максимум 2 раза
        disableConcurrentBuilds() // Запретить параллельные сборки
    }
    
    environment {
        // Используем credentials для Git
        GIT_CREDENTIALS = credentials('tea-token')
        // Настройки для Docker (если нужно)
        DOCKER_BUILDKIT = "1"
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    extensions: [
                        [$class: 'CleanBeforeCheckout'],
                        [$class: 'CloneOption', 
                         shallow: true, 
                         depth: 1,
                         noTags: true,
                         timeout: 10]
                    ],
                    userRemoteConfigs: [[
                        url: 'https://github.com/LonelyLake/tea-shop',
                        credentialsId: 'tea-token'
                    ]]
                ])
            }
        }
        
        stage('Build Frontend') {
            agent {
                docker {
                    image 'node:16-alpine'
                    args '--network host -v /var/jenkins_home/workspace/tea-shop/frontend:/app'
                    reuseNode true
                }
            }
            steps {
                dir('/app') {
                    sh '''
                        npm ci --no-audit
                        npm run build
                    '''
                }
            }
            post {
                always {
                    echo 'Frontend build completed'
                }
            }
        }
        
        stage('Build Backend') {
            agent {
                docker {
                    image 'docker:dind'
                    args '--privileged --network host -v /var/run/docker.sock:/var/run/docker.sock'
                    reuseNode true
                }
            }
            steps {
                dir('backend') {
                    sh '''
                        docker build -t tea-backend:${BUILD_NUMBER} .
                        docker tag tea-backend:${BUILD_NUMBER} tea-backend:latest
                    '''
                }
            }
            post {
                always {
                    echo 'Backend build completed'
                }
            }
        }
        
        stage('Deploy') {
            when {
                branch 'main' // Разворачиваем только из ветки main
            }
            steps {
                script {
                    echo '=== DEPLOY TO PRODUCTION ==='
                    // Здесь могут быть ваши команды деплоя
                }
            }
        }
    }
    
    post {
        always {
            echo "Pipeline completed with status: ${currentBuild.currentResult}"
            script {
                // Очистка Docker образов
                sh 'docker system prune -f || true'
            }
        }
        success {
            echo '✅ Pipeline succeeded!'
            // Можно добавить уведомления в Slack/Email
        }
        failure {
            echo '❌ Pipeline failed!'
            // Можно добавить уведомления об ошибке
        }
        unstable {
            echo '⚠️ Pipeline unstable!'
        }
    }
}