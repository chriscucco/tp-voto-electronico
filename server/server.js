const {createUser, getUsers, getUserById} = require('../controllers/users/users');
const {createRole, getRoles, getRoleByID} = require('../controllers/roles/roles');
const {getRegisteredVotes, getUserIDsByVotesRegistered, getVotesRegisteredByUserID, registerUserIDAndRoom} = require('../controllers/votes_register/votes')
const {logInUser} = require('../controllers/users/login')
const express = require('express')
const dotenv = require('dotenv')

// Env variables and constants
dotenv.config();
const PORT = process.env.PORT;
const HOST = '0.0.0.0';

const app = express();
var path = require("path");
const { registerUserAndRoom } = require('../dao/interface');

var router = express.Router();


app.use("/", express.static(path.join(__dirname, "..", "build")));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

router.use(function (req, res, next) {
  console.log("/" + req.method);
  next();
});

// USERS

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

// LOGIN

router.post("/logIn", async (req, res) => {
  const response = await logInUser(req, res)
  if (response.valid) {
    res.status(200).json(response.response)
  } else {
    res.status(response.status).json(response.message)
  }
});

// ROLES

router.get("/roles", async(req,res) => {
  const roles =  await getRoles(req, res)
  res.json(roles)
});

router.get("/role", async(req,res) => {
  const role =  await getRoleByID(req, res)
  res.json(role)
});

router.post("/roles", async (req, res) => {
  const response = await createRole(req, res)
  if (response.valid) {
    res.status(200).json(response.response)
  } else {
    res.status(response.status).json(response.message)
  }
});

// REGISTERED VOTES

// ROLES

router.get("/registered/votes", async(req,res) => {
  const roles =  await getRegisteredVotes(req, res)
  res.json(roles)
});

router.get("/registered/votes/users", async(req,res) => {
  const role =  await getVotesRegisteredByUserID(req, res)
  res.json(role)
});

router.get("/registered/votes/rooms", async(req,res) => {
  const role =  await getUserIDsByVotesRegistered(req, res)
  res.json(role)
});

router.post("/registered/votes", async (req, res) => {
  const response = await registerUserIDAndRoom(req, res)
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