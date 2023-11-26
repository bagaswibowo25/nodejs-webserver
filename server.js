const http = require('http');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();

// Definisi format log kustom
morgan.format('json', function (tokens, req, res) {
  let logObject = {
    msg: {
      method: tokens.method(req, res),
      url: tokens.url(req, res),
      status: tokens.status(req, res),
      contentLength: tokens.res(req, res, 'content-length'),
      responseTime: tokens['response-time'](req, res) + ' ms',
      appVersion: 'v1'
    }
  };
  return JSON.stringify(logObject);
});

app.use(morgan('json'));

app.use(express.json());
app.use(express.static("express"));

// default URL for website
app.use('/', function(req,res){
    res.sendFile(path.join(__dirname+'/index.html'));
});

const server = http.createServer(app);
const port = 80;
server.listen(port);

console.debug('Server listening on port ' + port);
