const express = require('express');
const path = require('path');

const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer();
const localServer = 'http://localhost:3001';
const prodServer = 'https://event-checkout-api.herokuapp.com';

const app = express();

app.all("/api/*", function (req, res) {
    console.log('redirecting to Server1');
    apiProxy.web(req, res, { target: prodServer });
});

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/event-checkout'));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/event-checkout/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);