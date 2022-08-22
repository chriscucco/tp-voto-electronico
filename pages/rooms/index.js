var express = require('express');
var router = express.Router();
var path = require("path");

const {createRoom} = require('../../controllers/rooms/rooms');


router.post("", async (req, res) => {
    const response = await createRoom(req, res)
    if (response.valid) {
      res.redirect('/admin')
    } else {
      res.redirect('/add_room?retry=true')
    }
});

module.exports = router;