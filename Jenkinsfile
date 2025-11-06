pipeline {
    agent any

    environment {
        IMAGE = "casbinrule-express-demo"
        VERSION = "v${env.BUILD_NUMBER}"
        REGISTRY = "g2ang/casbinrule-express-demo"
    }

    stages {
        stage('Build & Push with Kaniko') {
            steps {
                echo "Building Docker image using Kaniko..."

                // Kaniko 직접 실행 (Docker 빌드 환경 없는 Jenkins에서도 가능)
                sh '''
                docker run --rm \
                  -v $(pwd)/app:/workspace \
                  -v /tmp:/kaniko/.docker \
                  gcr.io/kaniko-project/executor:latest \
                  --context /workspace \
                  --dockerfile /workspace/Dockerfile \
                  --destination=${REGISTRY}:${VERSION} \
                  --insecure
                '''
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                echo "Deploying to Kubernetes..."
                withCredentials([file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG')]) {
                    sh '''
                    kubectl get nodes
                    kubectl set image deployment/casbinrule-express-demo casbinrule-express-demo=${REGISTRY}:${VERSION}
                    kubectl rollout status deployment/casbinrule-express-demo
                    '''
                }
            }
        }
    }
}