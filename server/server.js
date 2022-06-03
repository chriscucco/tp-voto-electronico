const { createUser } = require('./controllers/users/users');
const express = require('express')
const app = express();
var path = require("path");

var router = express.Router();
const database = require('../dao/db')

// Constants
const PORT = 8000;
const HOST = '0.0.0.0';

app.use("/", express.static(path.join(__dirname, "..", "build")));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

router.use(function (req, res, next) {
  console.log("/" + req.method);
  next();
});

router.get("/users", async(req,res) => {
  const users = await database.select().from('users')
  res.json(users)
});

router.post("/user", async (req, res) => {
  const user = await database('users').insert({user_id: req.body.user_id, name: req.body.name, last_name: req.body.last_name }).returning('*')
  res.json(user)
});

app.use(router);

app.listen(8000, function () {
  console.log('Example app listening on port 8000!')
})