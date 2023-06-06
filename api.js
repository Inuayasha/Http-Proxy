const express = require('express');
const morgan = require('morgan');
const {createProxyMiddleware} = require('http-proxy-middleware');


// Create Express Server
const app = express();

// Configuration
const PORT = 3000;
const HOST = "localhost";
const API_SERVICE_URL = "https://api-v2.soundcloud.com";

// Logging
app.use(morgan('dev'));




// Info GET endpoint
app.get('/test', (req, res, next) => {
    res.send('Test endpoint to ensure connectivity');
 });

// // Authorization
// app.use('', (req, res, next) => {
//     if (req.headers.authorization) {
//         next();
//     } else {
//         res.sendStatus(403);
//     }
//  });

// Proxy endpoints
app.use('/api', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        [`^/api`]: '',
    },
 }));





 // Start the Proxy
app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
 });