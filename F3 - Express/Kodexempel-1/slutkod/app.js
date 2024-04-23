http.createServer(function (req,res) {

  let filnamn;

  if(req.url == '/') {
      filnamn = 'index.html';
  } 
  else {
      filnamn = req.url;
      filnamn = filnamn.substring(1);
  }

  fs.stat(filnamn, function(err, stats) {

      if(err) {
        res.writeHead(404, { 'Content-Type': 'text/html'});
        res.end();
      }
      else {
        let html = fs.readFileSync(filnamn).toString();
        res.writeHead(200, {'Content-Type' : 'text/html'});
        res.write(html);
        res.end();
        
      }
  })

}).listen(3000);