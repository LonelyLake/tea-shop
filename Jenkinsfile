pipeline {
    agent any
    stages {
        stage('Build Backend') {
            steps {
                sh 'cd backend && docker build -t tea-backend .'
            }
        }
        stage('Run Containers') {
            steps {
                sh 'docker-compose down || true'
                sh 'docker-compose up -d'
            }
        }
    }
}
