var express = require('express');
var router = express.Router();
var path = require("path");

const {createRoom} = require('../../controllers/rooms/rooms');
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

module.exports = router;