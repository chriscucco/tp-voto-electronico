var express = require('express');
var router = express.Router();
const {createRole, getRoles, getRoleByID} = require('../../controllers/roles/roles');

router.get("/all", async(req,res) => {
    const roles =  await getRoles(req, res)
    res.json(roles)
  });
  
  router.get("", async(req,res) => {
    const role =  await getRoleByID(req, res)
    res.json(role)
  });
  
  router.post("", async (req, res) => {
    const response = await createRole(req, res)
    if (response.valid) {
      res.status(200).json(response.response)
    } else {
      res.status(response.status).json(response.message)
    }
  });


module.exports = router;