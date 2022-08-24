var express = require('express');
var router = express.Router();
const {getLists, getListsByID, getListByName, createList} = require('../../controllers/lists/lists')

router.get("/all", async(req,res) => {
    const lists =  await getLists(req, res)
    res.json(lists)
})

router.get("/list", async(req,res) => {
    const lists =  await getListsByID(req, res)
    res.json(lists)
})

router.get("/name", async(req,res) => {
    const lists =  await getListByName(req, res)
    res.json(lists)
})

router.post("", async (req, res) => {
    const response = await createList(req, res)
    if (response.valid) {
      res.redirect('/admin')
    } else {
      res.redirect('/add_list?retry=true')
    }
});

module.exports = router;