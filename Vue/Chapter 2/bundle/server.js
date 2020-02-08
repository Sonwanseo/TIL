var express = require("express");
var app = express();
app.use(express.static("."));
var port = 3000;
app.listen(port, function() {
  console.log(`server is opened in port:${port}`);
  setInterval(function() {
    console.log("hello");
  }, 1000);
});
