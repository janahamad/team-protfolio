pipeline {
  agent any

  triggers {
    // Automatically run when there's a push to the main branch
    pollSCM('H/2 * * * *')  // Jenkins checks GitHub every 2 minutes for changes
  }

  stages {
    stage('Clean Up Old Containers') {
      steps {
        sh '''
          cd /workspace/teamportfolio
          echo "🧹 Cleaning up old containers..."
          docker compose down --remove-orphans || true
        '''
      }
    }

    stage('Build Docker Images') {
      steps {
        sh '''
          cd /workspace/teamportfolio
          echo "🔨 Building images..."
          docker compose build --no-cache
        '''
      }
    }

    stage('Deploy Containers') {
      steps {
        sh '''
          cd /workspace/teamportfolio
          echo "🚀 Deploying containers..."
          docker compose up -d --force-recreate
        '''
      }
    }
  }

  post {
    success {
      echo '✅ Deployment successful!'
    }
    failure {
      echo '❌ Build failed! Check Jenkins logs.'
    }
  }
}
