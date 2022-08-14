var express = require('express');
var router = express.Router();

router.get("", async(req, res) => {
    const session = req.session
    if (session && session.loggedIn) {
        res.status(200).json({"response": "ENABLED"})   
    } else {
        res.status(401).json({"error": "User unauthorized"})
    }
});

module.exports = router;
