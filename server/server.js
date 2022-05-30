const { createUser } = require('./controllers/users/users');
const express = require('express')
const app = express();
var path = require("path");

var router = express.Router();

// Constants
const PORT = 8000;
const HOST = '0.0.0.0';

app.use("/", express.static(path.join(__dirname, "..", "build")));

router.use(function (req, res, next) {
  console.log("/" + req.method);
  next();
});

router.get("/home",function(req,res){
  res.send("Hello World!");
});

app.use(router);

app.listen(8000, function () {
  console.log('Example app listening on port 8000!')
})