'use strict';
const http = require('http');
const fs = require('fs');

http.createServer(function (req,res) {

  let filnamn;

  if(req.url == '/') {
      filnamn = 'index.html';
      let html = fs.readFileSync(filnamn).toString();
      res.writeHead(200, {'Content-Type' : 'text/html'});
      res.write(html);
      res.end();
  } 
  else {
      filnamn = req.url;
      filnamn = filnamn.substring(1);

      fs.stat(filnamn, function(err, stats) {

        if(err) {
          res.writeHead(404, { 'Content-Type': 'text/html'});
          res.end();
        }
        else {
         
          let lastDot = filnamn.lastIndexOf('.');
          let fileExt = filnamn.substring(lastDot+1);

          switch( fileExt ) {
            case 'svg' :
              res.writeHead(200, { 'Content-Type': 'image/svg+xml'});
              break;
              default:
                res.writeHead(200, { 'Content-Type': 'text/html'});
                break;
          }


          let html = fs.readFileSync(filnamn).toString();
          res.write(html);
          res.end();
          
        }
    })
  }

  

}).listen(3000);