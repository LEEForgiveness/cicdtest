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
              --cache=false \
              --no-push-cache \
              --verbosity=debug \
              --insecure
            """
          }
        }
      }
    }
    stage('Debug Workspace') {
      steps {
        script {
          echo "📂 Listing workspace files..."
          sh 'ls -al ${WORKSPACE}'
          echo "📂 Recursive listing..."
          sh 'ls -R ${WORKSPACE} | head -n 100'
        }
      }
    }

    stage('Deploy to k3s') {
      steps {
        echo "🚀 Deploying to k3s..."
            container('tools') {
              sh '''
              kubectl apply -f k8s/deployment.yaml
              kubectl rollout status deployment casbinrule-express-demo -n default
              '''
            }
      }
    }
  }
}