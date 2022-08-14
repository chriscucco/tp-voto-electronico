const express = require('express')
const dotenv = require('dotenv')
var session = require('express-session')
var cookieParser = require('cookie-parser')

// Env variables and constants
dotenv.config();
const PORT = process.env.PORT;
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
const loginRoute = require('../pages/login')
const logoutRoute = require('../pages/logout')
const usersRoute = require('../pages/users')
const votesRegisterRoute = require('../pages/registered_votes')
const rolesRoute = require('../pages/roles')
const authRoute = require('../pages/auth')

router.use('/home', homeRoute)
router.use('/login', loginRoute)
router.use('/logout', logoutRoute)
router.use('/users', usersRoute)
router.use('/registered/votes', votesRegisterRoute)
router.use('/roles', rolesRoute)
router.use('/auth', authRoute)


app.use(router);

app.listen(PORT, function () {
  console.log(`Started! Listening on port ${PORT}!`)
})

module.exports = router