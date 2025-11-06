pipeline {
  agent {
    kubernetes {
      label 'jenkins-image-builder'
      defaultContainer 'jnlp'
    }
  }

    environment {
        REGISTRY = "g2ang/casbinrule-express-demo"
        PROJECT = "casbinrule-express-demo"
    }

  stages {
    stage('Git Checkout') {
      steps {
        checkout scm
      }
    }
    stage('Build & Push') {
      steps {
        container('kaniko') {
          script {
            def dest = "${env.REGISTRY}/${env.PROJECT}:latest"
            sh """
            /kaniko/executor \
            --dockerfile=./Dockerfile \
            --context=dir://./ \
            --destination=${dest} \
            --verbosity=debug \
            --cleanup
            """
          }
        }
      }
    }
    stage('Deploy to k3s') {
      steps {
        sh 'kubectl apply -f k8s/deployment.yaml'
      }
    }
  }
}