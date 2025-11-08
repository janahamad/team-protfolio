pipeline {
  agent any

  stages {
    stage('Checkout') {
      steps {
        git branch: 'main', url: 'https://github.com/janahamad/team-protfolio.git'
      }
    }

    stage('Build Docker Images') {
      steps {
        sh '''
          docker compose down
          docker compose build
        '''
      }
    }

    stage('Deploy Containers') {
      steps {
        sh '''
          docker compose up -d
        '''
      }
    }
  }
}
