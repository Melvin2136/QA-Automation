
---

# Correct Jenkinsfile (Paste EXACTLY This)

:::writing{variant="standard" id="53820"}
pipeline {
    agent any

    stages {
        stage('Install Dependencies') {
            steps {
                bat 'npm install'
                bat 'npx playwright install'
            }
        }

        stage('Run E2E Tests') {
            steps {
                script {
                    def status = bat(
                        script: 'npx playwright test tests',
                        returnStatus: true
                    )

                    if (status != 0) {
                        echo "Tests failed, but continuing to generate reports..."
                        currentBuild.result = 'UNSTABLE'
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Generating Playwright HTML reports...'

            publishHTML(target: [
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report',
                alwaysLinkToLastBuild: true,
                keepAll: true,
                allowMissing: true
            ])
        }
    }
}
:::

---

# What You Need To Do

### In ****:
1. Open Jenkinsfile  
2. Remove everything  
3. Paste above code  
4. Save/Commit  
5. Rebuild Jenkins  

---

# Pro Tip
Your Jenkinsfile should start directly with:

```groovy id="ql7jjh"
pipeline {
