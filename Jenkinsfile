pipeline {
	agent any
	environment {
		IMAGE_NAME = "casbinrule-express-demo"
		VERSION = "v${env.BUILD_NUMBER}"
	}

	stages {
		stage('Build Docker image') {
			steps {
				sh '''
          eval $(minikube docker-env)
          docker build -t $IMAGE_NAME:$VERSION ./app
        '''
			}
		}

		stage('Deploy to Minikube') {
			steps {
				sh '''
          kubectl set image deployment/casbinrule-express-demo casbinrule-express-demo=$IMAGE_NAME:$VERSION --record || true
          kubectl rollout status deployment/casbinrule-express-demo
        '''
			}
		}
	}
}