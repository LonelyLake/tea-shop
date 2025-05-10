pipeline {
    agent any
    
    options {
        timeout(time: 30, unit: 'MINUTES')
    }
    
    stages {
        stage('Checkout') {
            steps {
                script {
                    try {
                        checkout([
                            $class: 'GitSCM',
                            branches: [[name: '*/main']],
                            extensions: [],
                            userRemoteConfigs: [[
                                credentialsId: 'tea-token',
                                url: 'https://github.com/LonelyLake/tea-shop'
                            ]]
                        ])
                    } catch (e) {
                        echo "Failed to checkout repository: ${e}"
                        currentBuild.result = 'FAILURE'
                        error("Checkout failed")
                    }
                }
            }
        }
        
        // Add your other stages here
    }
    
    post {
        always {
            script {
                if (currentBuild.result == null || currentBuild.result == 'SUCCESS') {
                    echo '=== CLEANUP AND LOGGING ==='
                    cleanWs()
                }
            }
        }
        failure {
            echo '❌ Deployment error!'
            // Only try to send Slack if the plugin is available
            script {
                if (env.SLACK_CHANNEL) {
                    try {
                        slackSend channel: env.SLACK_CHANNEL,
                                message: "Build Failed: ${currentBuild.fullDisplayName}"
                    } catch (e) {
                        echo "Failed to send Slack notification: ${e}"
                    }
                }
            }
        }
    }
}