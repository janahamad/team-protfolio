pipeline {
  agent any
  stages {
    stage('Build Docker Images') {
      steps {
        sh '''
          cd /workspace/teamportfolio
          docker compose down
          docker compose build
        '''
      }
    }
    stage('Deploy Containers') {
      steps {
        sh '''
          cd /workspace/teamportfolio
          docker compose up -d
        '''
      }
    }
  }
}
