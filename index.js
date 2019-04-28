const express = require('express');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
var sessionstore = require('sessionstore');
const path = require('path');

const Runner = require('./models/runner.model');
const routes = require('./routes');
const mongoDB = require('./mongodb.utils');

passport.use(Runner.createStrategy());
passport.serializeUser(Runner.serializeUser());
passport.deserializeUser(Runner.deserializeUser());

mongoDB.createEventListeners();
mongoDB.connect();

const app = express();

app.set('view engine', 'pug');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: ['maniac marathoner', 'road runner', 'sadistic sprinter'],
  resave: true,
  saveUninitialized: true,
  // cookie: { secure: true },
  store: sessionstore.createSessionStore({
    type: 'mongodb',
    host: 'localhost',         // optional
    port: 27017,               // optional
    dbName: 'sessionDb',       // optional
    collectionName: 'sessions',// optional
    timeout: 10000,             // optional
    authSource: 'authedicationDatabase',        // optional
    username: "ffranklin@email.com"               // optional
    // password: 'secret'                          // optional
    // url: 'mongodb://user:pass@host:port/db?opts // optional
  })
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

app.listen(process.env.PORT || 3003, () => console.log('listening on port 3003....'));