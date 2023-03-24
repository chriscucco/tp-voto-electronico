var express = require('express');
var router = express.Router();
const {getReviewers, getReviewersByListId, createReviewer, deleteReviewer} = require('../../controllers/reviewer/reviewer')

router.get("/all", async(req,res) => {
    const lists =  await getReviewers(req, res)
    res.json(lists)
})

router.get("/list", async(req,res) => {
    const lists =  await getReviewersByListId(req, res)
    res.json(lists)
})

router.post("/add", async (req, res) => {
    const response = await createReviewer(req, res)
    res.status(response.status).json(response.message)
});

router.post("/delete", async (req, res) => {
    const response = await deleteReviewer(req, res)
    res.status(response.status).json(response.message)
})

module.exports = router;