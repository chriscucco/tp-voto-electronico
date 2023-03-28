const express = require('express')
const dotenv = require('dotenv')
var session = require('express-session')
var cookieParser = require('cookie-parser')

// Env variables and constants
dotenv.config();
const PORT = process.env.EXPRESS_PORT || process.env.PORT || 8001;
const HOST = '0.0.0.0';

const app = express();
const oneDay = 1000 * 60 * 60 * 24;

app.use(session({
	secret: 'secret',
	resave: true,
  cookie: { maxAge: oneDay },
	saveUninitialized: true
}));

var path = require("path");
const router = express.Router();


app.use("/", express.static(path.join(__dirname, "..", "build")));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

router.use(function (req, res, next) {
  console.log("/" + req.method);
  next();
});


/**
 * Routers
 */

const homeRoute = require('../pages/home')
const reviewerHomeRoute = require('../pages/reviewer_home')
const reviewerRoute = require('../pages/reviewer')
const loginRoute = require('../pages/login')
const logoutRoute = require('../pages/logout')
const usersRoute = require('../pages/users')
const votesRegisterRoute = require('../pages/registered_votes')
const rolesRoute = require('../pages/roles')
const authRoute = require('../pages/auth')
const listsRoute = require('../pages/lists')
const votersRoute = require('../pages/voters')
const candidatesRoute = require('../pages/candidates')
const myRoomsRoute = require('../pages/my_rooms')
const adminRoute = require('../pages/admin')
const addAdminRoute = require('../pages/add_admin')
const addReviewerRoute = require('../pages/add_reviewer')
const addRoomRoute = require('../pages/add_room')
const roomsRoute = require('../pages/rooms')
const addListRoute = require('../pages/add_list')
const addCandidateRoute = require('../pages/add_candidate')
const addVotersRoute = require('../pages/add_voters')
const addListToRoomRoute = require('../pages/add_list_to_room')
const roomListsRoute = require('../pages/roomLists')
const voteRoute = require('../pages/vote')
const showListsRoute = require('../pages/show_lists')
const showRoomsRoute = require('../pages/show_rooms')
const deleteCandidatesRoute = require('../pages/delete_candidates')
const deleteReviewerRoute = require('../pages/delete_reviewer')
const showReviewsRoute = require('../pages/show_reviews')
const finishRoomsRoute = require('../pages/finish_rooms')
const reviewsRoute = require('../pages/reviews')


router.use('/home', homeRoute)
router.use('/reviewer_home', reviewerHomeRoute)
router.use('/login', loginRoute)
router.use('/logout', logoutRoute)
router.use('/users', usersRoute)
router.use('/registered/votes', votesRegisterRoute)
router.use('/roles', rolesRoute)
router.use('/auth', authRoute)
router.use('/lists', listsRoute)
router.use('/voters', votersRoute)
router.use('/candidates', candidatesRoute)
router.use('/my_rooms', myRoomsRoute)
router.use('/admin', adminRoute)
router.use('/add_admin', addAdminRoute)
router.use('/add_reviewer', addReviewerRoute)
router.use('/add_room', addRoomRoute)
router.use('/add_list', addListRoute)
router.use('/add_candidate', addCandidateRoute)
router.use('/rooms', roomsRoute)
router.use('/add_voters', addVotersRoute)
router.use('/add_list_to_room', addListToRoomRoute)
router.use('/roomLists', roomListsRoute)
router.use('/vote', voteRoute)
router.use('/show_rooms', showRoomsRoute)
router.use('/show_lists', showListsRoute)
router.use('/delete_candidate', deleteCandidatesRoute)
router.use('/delete_reviewer', deleteReviewerRoute)
router.use('/reviewer', reviewerRoute)
router.use('/show_reviews', showReviewsRoute)
router.use('/finish_rooms', finishRoomsRoute)
router.use('/reviews', reviewsRoute)


app.use(router);

app.listen(PORT, function () {
  console.log(`Started! Listening on port ${PORT}!`)
})

module.exports = router