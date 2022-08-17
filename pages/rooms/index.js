var express = require('express');
var router = express.Router();
const {getRooms, getRoomByID, createRoom} = require('../../controllers/rooms/rooms');



router.get("/all", async(req,res) => {
    const rooms =  await getRooms(req, res)
    res.json(rooms)
})

router.get("/room", async(req,res) => {
    const rooms =  await getRoomByID(req, res)
    res.json(rooms)
})

router.post("", async (req, res) => {
    const response = await createRoom(req, res)
    if (response.valid) {
      res.status(200).json(response.response)
    } else {
      res.status(response.status).json(response.message)
    }
});


module.exports = router;