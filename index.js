const { createUser } = require('./controllers/users/users');
const express = require('express')
const app = express();
var router = express.Router();
var path = __dirname + '/views/';


// Constants
const PORT = 8000;
const HOST = '0.0.0.0';

router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

router.get("/",function(req,res){
  res.send("Hello World1!");
});

router.get("/home",function(req,res){
  res.send("Hello World2");
});

app.use(express.static(path));
app.use("/", router);

app.listen(8000, function () {
  console.log('Example app listening on port 8000!')
})