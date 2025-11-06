pipeline {
  agent {
    kubernetes {
      label 'jenkins-image-builder'
      defaultContainer 'jnlp'
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
      - sleep
      args:
      - infinity
      tty: true
      volumeMounts:
      - name: kaniko-secret
        mountPath: /kaniko/.docker/
    - name: tools
      image: bitnami/kubectl:latest
      command:
      - sleep
      args:
      - infinity
      tty: true
    volumes:
    - name: kaniko-secret
      secret:
        secretName: regcred
  """
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