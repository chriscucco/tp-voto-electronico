var express = require('express');
var router = express.Router();
var path = require("path");

router.get("", express.static(path.join(__dirname, "..", "..", "build")));

module.exports = router;