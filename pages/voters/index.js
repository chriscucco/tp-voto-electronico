var express = require('express');
var router = express.Router();

const {getAllVotersAndRooms, getVotersByRoom, getRoomsByVoter, createNewVoter, addNewVotersGroup, getVotersDetailsByRoom} = require('../../controllers/voters/voters');


router.get("/all", async(req,res) => {
    const voters =  await getAllVotersAndRooms(req, res)
    res.json(voters)
})

router.get("/user", async(req,res) => {
    const voters =  await getVotersByRoom(req, res)
    res.json(voters)
})

router.get("/user_detail", async(req,res) => {
  const voters = await getVotersDetailsByRoom(req, res)
  res.json(voters)
})

router.get("/room", async(req,res) => {
    const voters =  await getRoomsByVoter(req, res)
    res.json(voters)
})

router.post("", async (req, res) => {
    const response = await createNewVoter(req, res)
    if (response.valid) {
      res.status(200).json(response.response)
    } else {
      res.status(response.status).json(response.message)
    }
});

router.post("/add", async (req, res) => {
  const response = await addNewVotersGroup(req, res)
  res.status(response.status).json(response.message)
});

module.exports = router;