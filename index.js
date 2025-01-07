const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const moment = require('moment');

const port = process.env.PORT || 4000;
const app = express();

// Use CORS to allow cross-origin requests
app.use(cors());

// Middleware to parse JSON body
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Directory to store log files
const logDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

// POST endpoint to receive data
app.post('/logs', (req, res) => {
    const requestData = req.body; // Request body data
    const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress; // Client IP
    const userAgent = req.headers['user-agent']; // User-Agent

    // Log the request information
    const logFile = path.join(logDir, `${moment().format('YYYY-MM-DD')}.log`);
    const logEntry = `${moment().format('YYYY-MM-DD HH:mm:ss')} | POST | /logs | ${clientIp} | ${userAgent} | ${JSON.stringify(requestData)}`;
    fs.appendFileSync(logFile, logEntry + '\n');

    console.log('Received request from:', clientIp);
    console.log('User-Agent:', userAgent);
    console.log('Request Body:', JSON.stringify(requestData, null, 2));

    res.status(200).json({ message: 'Data logged successfully' });
});

// GET endpoint to list all log files
app.get('/logs', (req, res) => {
    fs.readdir(logDir, (err, files) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading logs directory' });
        }
        res.status(200).json({ files });
    });
});

// GET endpoint to retrieve a specific log file
app.get('/logs/:id', (req, res) => {
    const logFile = path.join(logDir, req.params.id);
    if (!fs.existsSync(logFile)) {
        return res.status(404).json({ message: 'Log file not found' });
    }
    res.sendFile(logFile);
});

// Fallback route for non-API routes (serves index.html)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`✅ Server is running on http://localhost:${port}`);
});
