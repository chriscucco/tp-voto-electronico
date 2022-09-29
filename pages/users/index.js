var express = require('express');
var router = express.Router();
const {createUser, getUsers, getUserByUserId} = require('../../controllers/users/users');
var path = require("path");

router.get("", express.static(path.join(__dirname, "..", "..", "build")));

router.get("/all", async(req,res) => {
    const users =  await getUsers(req, res)
    res.json(users)
  });
  
  router.get("/user", async(req,res) => {
    const users =  await getUserByUserId(req, res)
    res.json(users)
  });
  
  router.post("", async (req, res) => {
    const response = await createUser(req, res)
    res.status(response.status).json(response.message)
  });

module.exports = router;