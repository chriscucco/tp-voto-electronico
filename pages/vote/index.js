var express = require('express');
var router = express.Router();

const {processVote, countVotes} = require('../../controllers/vote/vote')


router.get("/create/:roomId/list/:listId", async (req, res) => {
    const response = await processVote(req, res)
    res.status(response.status).json(response.data)
})

router.get("/count/:roomId", async (req, res) => {
    const response = await countVotes(req, res)
    res.status(response.status).json(response.data)
})

module.exports = router;