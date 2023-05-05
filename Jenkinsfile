pipeline {
    agent {
        node {
            label 'cloudythy'
        }
    }
    environment {
        SSH =  credentials('a3b7ee69-1c10-4158-86f4-5ec46e30a266')
        ACCESS_TOKEN = credentials('vove-access-token')
    }

    triggers {
        githubPush()
    }

    stages {
        stage('Detect environment') {
            steps {
                script {
                    def credentialsId = ''
                    env.BRANCH_NAME = env.BRANCH_NAME?env.BRANCH_NAME:"test_pipeline"
                    def branch = env.BRANCH_NAME
                    if (branch == 'master') {
                        env.BE_ENV = 'vove_be_env_prod'
                        env.FE_ENV = 'vove_fe_env_prod'
                        env.ALEMBIC = 'alembic_vove_bug'
                        env.CONTAINER_PREFIX = 'prod'
                    } else if (branch == 'dev' || branch == 'test_pipeline') {
                        env.BE_ENV = 'vove_be_env'
                        env.FE_ENV = 'vove_fe_env'
                        env.ALEMBIC = 'alembic_vove_bug'
                        env.CONTAINER_PREFIX = 'dev'
                    }
                }
            }
        }
        stage('Clean workspace before build') {
            steps {
                script{
                    sh "rm -rf ${env.CONTAINER_PREFIX}"
                    sh "mkdir ${env.CONTAINER_PREFIX}"
                }
            }
        }
        stage('Build Repositories') {
            steps {
                script {                   
                    withCredentials([
                        file(credentialsId: env.BE_ENV, variable: 'BE_ENV'),
                        file(credentialsId: env.FE_ENV, variable: 'FE_ENV'),
                    ]){               
                        def url = 'git@github.com:3T-LVTN/vove-managed.git'
                        sh "cd $env.CONTAINER_PREFIX; ssh-agent bash -c 'ssh-add ${env.SSH}; ssh -o StrictHostKeyChecking=no cloudythy@gmail.com@github.com;git clone ${url} -b ${env.BRANCH_NAME}'"
                        // build be
                        def directoryPrefix = "$env.WORKSPACE/$env.CONTAINER_PREFIX/vove-managed"  
                        def directory = "$directoryPrefix/back-end"  
                        sh "cp $BE_ENV $directory/.env"
                        sh "cd $directory; chmod +x ./build.sh; ./build.sh --env $env.CONTAINER_PREFIX --env-file .env"                         
                        directory = "$directoryPrefix/front-end" 
                        sh "cp $FE_ENV $directory/.env"
                        sh "cd $directory; chmod +x ./build.sh; ./build.sh --env $env.CONTAINER_PREFIX --env-file .env"                        
                    
                    }
                }
            }
        }
    }
}