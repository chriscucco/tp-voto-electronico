var express = require('express');
var router = express.Router();
const {getRegisteredVotes, getUserIDsByVotesRegistered, getVotesRegisteredByUserID, registerUserIDAndRoom} = require('../../controllers/votes_register/votes')



router.get("", async(req,res) => {
    const roles =  await getRegisteredVotes(req, res)
    res.json(roles)
  });
  
router.get("/users", async(req,res) => {
    const role =  await getVotesRegisteredByUserID(req, res)
    res.json(role)
  });
  
router.get("/rooms", async(req,res) => {
    const role =  await getUserIDsByVotesRegistered(req, res)
    res.json(role)
  });
  
router.post("", async (req, res) => {
    const response = await registerUserIDAndRoom(req, res)
    if (response.valid) {
      res.status(200).json(response.response)
    } else {
      res.status(response.status).json(response.message)
    }
  });
  
module.exports = router;
