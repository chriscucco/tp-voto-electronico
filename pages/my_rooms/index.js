var express = require('express');
var router = express.Router();
var path = require("path");
const {getRoomsInfoByVoter, getRoomsDetails, getRoomsInfo, getRoomsInfoAdmin} = require('../../controllers/my_rooms/my_rooms')

router.get("", express.static(path.join(__dirname, "..", "..", "build")));

router.get("/rooms", async (req, res) => {
    const response = await getRoomsInfoByVoter(req, res)
    res.status(response.status).json(response.data)
  });

router.get("/rooms/details/:id", async (req, res) => {
  const response = await getRoomsDetails(req, res)
  res.status(response.status).json(response.data)
})

router.get("/rooms/info/:id", async (req, res) => {
  const response = await getRoomsInfo(req, res)
  res.status(response.status).json(response.data)
})

router.get("/rooms/info/:id/admin", async (req, res) => {
  const response = await getRoomsInfoAdmin(req, res)
  res.status(response.status).json(response.data)
})

module.exports = router;