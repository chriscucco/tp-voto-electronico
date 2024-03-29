var express = require('express');
var router = express.Router();

const {getAllCandidates, getCandidatesByListID, getCandidatesByRoles, getCandidatesByID, getCandidatesByName, getCandidatesFromListIDAndRole, createCandidate, deleteCandidate} = require('../../controllers/candidates/candidates')

router.get("/all", async(req,res) => {
    const candidates =  await getAllCandidates(req, res)
    res.json(candidates)
})

router.get("/list", async(req,res) => {
    const candidates =  await getCandidatesByListID(req, res)
    res.json(candidates)
})

router.get("/roles", async(req,res) => {
    const candidates =  await getCandidatesByRoles(req, res)
    res.json(candidates)
})

router.get("/candidate", async(req,res) => {
    const candidates =  await getCandidatesByID(req, res)
    res.json(candidates)
})

router.get("/name", async(req,res) => {
    const candidates =  await getCandidatesByName(req, res)
    res.json(candidates)
})

router.get("/list/role", async(req,res) => {
    const candidates =  await getCandidatesFromListIDAndRole(req, res)
    res.json(candidates)
})

router.post("", async (req, res) => {
    const response = await createCandidate(req, res)
    res.status(response.status).json(response.message)
});

router.post("/delete", async (req, res) => {
    const response = await deleteCandidate(req, res)
    res.status(response.status).json(response.message)
})

module.exports = router;