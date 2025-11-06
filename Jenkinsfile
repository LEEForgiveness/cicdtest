pipeline {
  agent {
    kubernetes {
      label 'jenkins-image-builder'
      defaultContainer 'jnlp'
    }
  }

    environment {
        REGISTRY = "g2ang/casbinrule-express-demo"
        IMAGE = "casbinrule-express-demo"
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
            def dest = "${env.REGISTRY}:latest"
            sh """
            /kaniko/executor \
              --context ${WORKSPACE} \
              --dockerfile ${WORKSPACE}/Dockerfile \
              --destination=${REGISTRY}:latest \
              --insecure
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