# To setup the application, use the following command:
```sh
npm init -y
npm install express body-parser
npm install cors
npm install moment
```

 
# To run the application, use the following command:
```sh
node app.js
```

Now your server is running on http://localhost:4000. When you send a POST request to http://localhost:4000/logs with a JSON body, 
it will log the client's IP address, user-agent, and the body content in the console.

# Usage
For example, if you use curl to test the POST endpoint:

```sh
curl -X POST /log -H "Content-Type: application/json" -d '{"name": "John Doe", "age": 30}'
```
It will log:
Received request from: ::1
User-Agent: curl/7.64.1
Request Body: {
  "name": "John Doe",
  "age": 30
}


## CI/CD Workflow
- Use GitHub Actions for automation:
    - Add a .github/workflows/deploy.yml file.     
    - Configure deployment steps:
        - Build the project.
        - Deploy to the chosen platform.
```sh
mkdir -p .github/workflows
touch .github/workflows/deploy.yml
```


# Secrets Configuration
- Go to GitHub → Settings → Secrets and Variables → Actions.
- Add RENDER_SERVICE_ID and RENDER_API_KEY.