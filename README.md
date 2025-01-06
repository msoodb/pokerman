# To setup the application, use the following command:
npm init -y
npm install express body-parser
npm install cors
npm install moment

 
# To run the application, use the following command:
node app.js

Now your server is running on http://localhost:4000. When you send a POST request to http://localhost:4000/logs with a JSON body, 
it will log the client's IP address, user-agent, and the body content in the console.

# Usage
For example, if you use curl to test the POST endpoint:
curl -X POST http://localhost:4000/log -H "Content-Type: application/json" -d '{"name": "John Doe", "age": 30}'
It will log:
Received request from: ::1
User-Agent: curl/7.64.1
Request Body: {
  "name": "John Doe",
  "age": 30
}
