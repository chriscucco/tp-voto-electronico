const { createUser, getUsers, getUserById } = require('../controllers/users/users');
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
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

router.use(function (req, res, next) {
  console.log("/" + req.method);
  next();
});

router.get("/users", async(req,res) => {
  const users =  await getUsers(req, res)
  res.json(users)
});

router.get("/user", async(req,res) => {
  const users =  await getUserById(req, res)
  res.json(users)
});

router.post("/user", async (req, res) => {
  const response = await createUser(req, res)
  if (response.valid) {
    res.status(200).json(response.response)
  } else {
    res.status(response.status).json(response.message)
  }
});

app.use(router);

app.listen(PORT, function () {
  console.log(`Started! Listening on port ${PORT}!`)
})