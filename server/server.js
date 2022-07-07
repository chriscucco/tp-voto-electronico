const express = require('express')
const dotenv = require('dotenv')
var session = require('express-session')

// Env variables and constants
dotenv.config();
const PORT = process.env.PORT;
const HOST = '0.0.0.0';

const app = express();

app.use(session({
	secret: 'secret',
	resave: true,
  cookie: { maxAge: 15000 },
  ttl: 0,
	saveUninitialized: true
}));

var path = require("path");
const router = express.Router();


app.use("/", express.static(path.join(__dirname, "..", "build")));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

router.use(function (req, res, next) {
  console.log("/" + req.method);
  next();
});


/**
 * Routers
 */

const loginRoute = require('../pages/login')
const usersRoute = require('../pages/users')
const votesRegisterRoute = require('../pages/registered_votes')
const rolesRoute = require('../pages/roles')

router.use('/login', loginRoute)
router.use('/users', usersRoute)
router.use('/registered/votes', votesRegisterRoute)
router.use('/roles', rolesRoute)


app.use(router);

app.listen(PORT, function () {
  console.log(`Started! Listening on port ${PORT}!`)
})

module.exports = router