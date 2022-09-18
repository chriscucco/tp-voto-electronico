var express = require('express');
var router = express.Router();
var path = require("path");

const {createRoom, getAllRooms, getRoomByID} = require('../../controllers/rooms/rooms');
const votingPlatformService = require('../../server/service/VotingPlatformService')


router.post("", async (req, res) => {
    const response = await createRoom(req, res)
    if (response.valid) {
      res.redirect('/admin')
    } else {
      res.redirect('/add_room?retry=true')
    }
});

router.get("/:id", async (req, res) => {
  const response = await votingPlatformService.getProposal(req.params.id)
  res.send(response)
});

router.get("/:id/database", async (req, res) => {
  const response = await getRoomByID(req, res)
  res.json(response)
});

router.get("", async (req, res) => {
  const response = await getAllRooms(req, res)
  res.json(response)
});

module.exports = router;