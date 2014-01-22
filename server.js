
var express = require("express"),
    app     = express(),
    port    = 3001;
    // port    = parseInt(process.env.PORT, 10) || 4567;
    
app.get("/", function(req, res) {
  console.log("request heard");
  res.redirect("index.html");
});

app.configure(function(){
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(express.static(__dirname));
  app.use(express.errorHandler({
    dumpExceptions: true, 
    showStack: true
  }));
  app.use(app.router);
});

app.listen(port);
console.log("Listening on port: ", port);

