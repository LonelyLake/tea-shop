pipeline {
    agent any
    
    options {
        timeout(time: 30, unit: 'MINUTES')
        retry(3) // Retry the entire pipeline up to 3 times
    }
    
    environment {
        // Set these in Jenkins credentials/store
        GIT_CREDENTIALS = credentials('tea-token') 
    }
    
    stages {
        stage('Checkout') {
            steps {
                script {
                    try {
                        checkout([
                            $class: 'GitSCM',
                            branches: [[name: '*/main']],
                            extensions: [[
                                $class: 'CleanBeforeCheckout'
                            ]],
                            userRemoteConfigs: [[
                                url: 'https://github.com/LonelyLake/tea-shop',
                                credentialsId: 'tea-token'
                            ]]
                        ])
                    } catch (Exception e) {
                        error("Failed to checkout repository: ${e.message}")
                    }
                }
            }
        }
        
        // Add other stages here
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
        
    }
    
    post {
        always {
            echo 'Pipeline completed - cleanup can go here'
        }
        failure {
            echo '❌ Pipeline failed!'
            // Add notification steps here if needed
        }
    }
}