var express = require('express');
var router = express.Router();
var path = require("path");
const {getRoomsInfoByVoter} = require('../../controllers/my_rooms/my_rooms')

router.get("", express.static(path.join(__dirname, "..", "..", "build")));

router.get("/rooms", async (req, res) => {
    const response = await getRoomsInfoByVoter(req, res)
    res.status(response.status).json(response.data)
  });

module.exports = router;