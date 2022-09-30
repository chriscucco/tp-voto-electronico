var express = require('express');
var router = express.Router();

const {getAllRoomLists, getRoomByListId, getListByRoomId, createNewRoomList, addListsToRoom} = require('../../controllers/roomLists/roomLists')


router.get("/all", async(req,res) => {
  const response =  await getAllRoomLists(req, res)
  res.json(response)
})

router.get("/room/:id", async(req,res) => {
  const response =  await getRoomByListId(req, res)
  res.json(response)
})

router.get("/list/:id", async(req,res) => {
  const response =  await getListByRoomId(req, res)
  res.json(response)
})


router.post("", async (req, res) => {
    const response = await createNewRoomList(req, res)
    if (response.valid) {
      res.status(200).json(response.response)
    } else {
      res.status(response.status).json(response.message)
    }
});

router.post("/add", async (req, res) => {
  const response = await addListsToRoom(req, res)
  res.status(response.status).json(response.message)
});

module.exports = router;