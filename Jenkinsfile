pipeline {
    agent any
    
    options {
        cleanWs() // Clean workspace before starting
    }
    
    stages {
        stage('Clean Workspace') {
            steps {
                cleanWs() // Additional cleanup for safety
            }
        }
        
        stage('Checkout') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    extensions: [
                        [$class: 'CleanBeforeCheckout'], // Clean before checkout
                        [$class: 'CloneOption', shallow: true, depth: 1]
                    ],
                    userRemoteConfigs: [[
                        url: 'https://github.com/LonelyLake/tea-shop',
                        credentialsId: 'tea-token'
                    ]]
                ])
            }
        }
    }
}