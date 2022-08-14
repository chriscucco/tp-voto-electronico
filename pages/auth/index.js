var express = require('express');
var router = express.Router();

router.get("", async(req, res) => {
    const session = req.session
    if (session && session.loggedIn) {
        const body = {
            user_id: req.session.user_id,
            dni: req.session.dni,
            role: req.session.role
        }
        res.status(200).json(body)   
    } else {
        res.status(401).json({"error": "User unauthorized"})
    }
});


module.exports = router;
