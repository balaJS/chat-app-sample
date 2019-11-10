const pug = require('pug');
const fetch = require('node-fetch');
const express = require('express');
const app = express();
const port = 8083;
const apiKey = 'your_api_key';
const defaultSource = 'the-washington-post';

app.get('/', function(req, res) {
  // res.send('It is cool.<br>Now it is ready.<br>Wow, it is working(TQ nodemon). now server restart is not required.');
  fetch(`https://newsapi.org/v2/everything?q=${defaultSource}&from=2019-10-27&sortBy=publishedAt`, {
    headers: {
      'x-api-key': apiKey
    }
  }).then(function(response) {
    return response.json();
  }).then(function(json) {
    res.render('index', {
      title: 'News| News app',
      news: json.articles
    });
  });
});

app.listen(port, () => console.log(`Server started at ${port}.`));
app.set('view engine', 'pug');
