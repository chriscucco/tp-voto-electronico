var express = require('express');
var router = express.Router();
const {getReviews, deleteReviews} = require('../../controllers/reviews/reviews')

router.get("/all", async(req,res) => {
    const lists =  await getReviews(req, res)
    res.json(lists)
})

router.get("/:id/delete", async(req,res) => {
    const lists =  await deleteReviews(req, res)
    res.json(lists)
})

module.exports = router;