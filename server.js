const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const localServer = 'http://localhost:3001';
const prodServer = 'https://event-checkout-api.herokuapp.com';

const app = express();

const apiProxy = createProxyMiddleware('/api', { target: prodServer, changeOrigin: true });

app.use(apiProxy);

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/event-checkout'));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/event-checkout/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);