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
