require('dotenv').config({path: __dirname + '/.env'})
const express = require('express');
const cors = require('cors')
const morgan = require('morgan');
const {createProxyMiddleware} = require('http-proxy-middleware');


// Create Express Server
const app = express();
app.use(cors())

// Configuration
const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";
const API_SERVICE_URL = "https://api-v2.soundcloud.com";

// Logging
app.use(morgan('dev'));


// Test GET endpoint
app.get('/test', (req, res, next) => {
    res.send('Test endpoint to ensure connectivity');
 });



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