var express = require('express');
var router = express.Router();
const {logInUser} = require('../../controllers/users/login')
const renderLogin = require('../../src/pages/login/login_index')

router.get("", renderLogin);


router.post("", async (req, res) => {
    const response = await logInUser(req, res)
    if (response.valid) {
      res.status(200).json(response.response)
    } else {
      res.status(response.status).json(response.message)
    }
  });

module.exports = router;
