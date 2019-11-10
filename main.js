const http = require('http');
const fs = require('fs');

http.createServer(function(req, res) {
  fs.readFile('index.html', function(err, data) {
    if (err) return err;
    res.writeHead(200, {'Content-type': 'text/html; charset=UTF-8'});
    res.write(data);
    res.end();
  });
}).listen(8080);
