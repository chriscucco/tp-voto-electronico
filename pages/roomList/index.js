var express = require('express');
var router = express.Router();
const {getRoomLists, getListsByRoomID, getRoomByListID, createRoomList} = require('../../controllers/roomList/roomList');

router.get("/all", async(req,res) => {
    const roomLists =  await getRoomLists(req, res)
    res.json(roomLists)
})

router.get("/room", async(req,res) => {
    const roomLists =  await getListsByRoomID(req, res)
    res.json(roomLists)
})

router.get("/list", async(req,res) => {
    const roomLists =  await getRoomByListID(req, res)
    res.json(roomLists)
})

router.post("", async (req, res) => {
    const response = await createRoomList(req, res)
    if (response.valid) {
      res.status(200).json(response.response)
    } else {
      res.status(response.status).json(response.message)
    }
});


module.exports = router;