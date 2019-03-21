const express = require('express');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const path = require('path');

const User = require('./models/user.model');
const routes = require('./routes');
const mongoDB = require('./mongodb.utils');

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoDB.createEventListeners();
mongoDB.connect();

const app = express();

app.set('view engine', 'pug');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: ['bitter beaver', 'dangerous doggy', 'eager echidna'],
  resave: true,
  saveUninitialized: true,
  // cookie: { secure: true },
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash
app.use(flash());

app.use('/', routes);

app.use(express.static(path.join(__dirname, 'views')))

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(process.env.PORT || 2222, () => console.log('listening on port 2222....'));