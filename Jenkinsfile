pipeline {
  agent {
    kubernetes {
      yaml """
apiVersion: v1
kind: Pod
metadata:
  namespace: jenkins
spec:
  containers:
  - name: kaniko
    image: gcr.io/kaniko-project/executor:latest
     command:
     - /kaniko/executor
     args:
     - --help
    tty: true
    volumeMounts:
    - name: kaniko-secret
      mountPath: /kaniko/.docker/
  volumes:
  - name: kaniko-secret
    secret:
      secretName: regcred
"""
    }
  }

  environment {
    IMAGE = "casbinrule-express-demo"
    VERSION = "v${env.BUILD_NUMBER}"
    REGISTRY = "g2ang/casbinrule-express-demo"
  }

  stages {
    stage('Build & Push with Kaniko') {
      steps {
        echo "🏗️ Building Docker image with Kaniko..."
        container('kaniko') {
          sh '''
          /kaniko/executor \
            --context ${WORKSPACE}/app \
            --dockerfile ${WORKSPACE}/app/Dockerfile \
            --destination=${REGISTRY}:${VERSION} \
            --insecure
          '''
        }
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        echo "🚀 Deploying to Kubernetes..."
        withCredentials([file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG')]) {
          sh '''
          kubectl get nodes
          kubectl set image deployment/casbinrule-express-demo \
            casbinrule-express-demo=${REGISTRY}:${VERSION} -n default
          kubectl rollout status deployment/casbinrule-express-demo -n default
          '''
        }
      }
    }
  }
}
