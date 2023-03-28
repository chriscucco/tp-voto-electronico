var express = require('express');
var router = express.Router();
var path = require("path");

const {createRoom, getAllRooms, getRoomByID, showAllRooms, showAllRoomsNotReadyForReview, showAllRoomsReadyForReview, 
  updateRoomForReview, updateRoomForReady} = require('../../controllers/rooms/rooms');
const votingPlatformService = require('../../server/service/VotingPlatformService')


router.post("", async (req, res) => {
    const response = await createRoom(req, res)
    res.status(response.status).json(response.message)
});

router.get("/:id", async (req, res) => {
  const response = await votingPlatformService.getRoom(req.params.id)
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

router.get("/set_ready_review/:id", async (req, res) => {
  const response = await updateRoomForReview(req, res)
  res.json(response)
});

router.get("/set_ready/:id", async (req, res) => {
  const response = await updateRoomForReady(req, res)
  res.json(response)
});

router.get("/show/all", async (req, res) => {
  const response = await showAllRooms(req, res)
  res.json(response)
})

router.get("/show/all/not_ready_for_review", async (req, res) => {
  const response = await showAllRoomsNotReadyForReview(req, res)
  res.json(response)
})

router.get("/show/all/ready_for_review/:id", async (req, res) => {
  const response = await showAllRoomsReadyForReview(req, res)
  res.json(response)
})

module.exports = router;