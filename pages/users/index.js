var express = require('express');
var router = express.Router();
const {createUser, getUsers, getUserById} = require('../../controllers/users/users');
var path = require("path");


router.get("", express.static(path.join(__dirname, "..", "..", "build")));

router.get("/all", async(req,res) => {
    const users =  await getUsers(req, res)
    res.json(users)
  });
  
  router.get("/:id", async(req,res) => {
    const users =  await getUserById(req, res)
    res.json(users)
  });
  
  router.post("", async (req, res) => {
    const response = await createUser(req, res)
    if (response.valid) {
      res.status(200).json(response.response)
    } else {
      res.status(response.status).json(response.message)
    }
  });

module.exports = router;