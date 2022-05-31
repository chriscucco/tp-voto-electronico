const { createUser } = require('./controllers/users/users');
const express = require('express')
const dotenv = require('dotenv')

// Env variables and constants
dotenv.config();
const PORT = process.env.PORT;
const HOST = '0.0.0.0';

const app = express();
var path = require("path");

var router = express.Router();


app.use("/", express.static(path.join(__dirname, "..", "build")));

router.use(function (req, res, next) {
  console.log("/" + req.method);
  next();
});

router.get("/home",function(req,res){
  res.send("Hello World!");
});

app.use(router);

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}!`)
})