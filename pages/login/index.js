var express = require('express');
var router = express.Router();
const {logInUser} = require('../../controllers/users/login')
var path = require("path");

router.get("", express.static(path.join(__dirname, "..", "..", "build")));


router.post("", async (req, res) => {
    const response = await logInUser(req, res)
    if (response.valid) {
      res.status(200).json(response.response)
    } else {
      res.status(response.status).json(response.message)
    }
  });

module.exports = router;
