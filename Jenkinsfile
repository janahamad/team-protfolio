pipeline {
  agent any

  stages {
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
