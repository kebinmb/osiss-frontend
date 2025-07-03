pipeline {
  agent any

  environment {
    ANGULAR_ENV = 'production'
  }



  stages {
    stage('Clone Repository') {
      steps {
        git 'https://github.com/your-user/your-angular-project.git'
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Build Angular App') {
      steps {
        sh 'ng build --configuration=production'
      }
    }

    stage('Archive Build') {
      steps {
        archiveArtifacts artifacts: 'dist/**', fingerprint: true
      }
    }
  }

  post {
    success {
      echo 'Build Successful!'
    }
    failure {
      echo 'Build Failed!'
    }
  }
}
