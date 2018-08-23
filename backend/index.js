
const fs = require('fs');

const express = require('express');
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));
  const allowCrossDomain = function(req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type');
  
      next();
  }
  app.use(allowCrossDomain);

const ytDL2 = require('./ytDL2');

app.get('/stream', function(req, res) {
    const url = req.query['ytUrl'];
    console.log(url, '<--------------------------------url');
    ytDL2(req, res, url);
});


app.listen(8080);
console.log('8080 is the magic port');