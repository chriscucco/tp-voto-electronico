var express = require('express');
var router = express.Router();
var path = require("path");


router.post("", async (req, res) => {
    console.log("//////")
    console.log(req.body)
    console.log("//////")
  });

module.exports = router;