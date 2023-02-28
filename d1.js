var http = require('http');
var url = require('url');
var fs = require('fs');

var no = 0;
server= http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  var filename = __dirname + q.pathname;
  console.log("filename: "+ filename);

  fs.readFile(filename, function (err, data) {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      return res.end("404 Not Found");
    }
    //client.publish('domOS/WebServerAktive', 'Send HTML page no: ' + no++)
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(data);
    console.log(q.pathname);
    return res.end();
  });
}).listen(8080);
