const router = require('express').Router();
const eventController = require('../controllers/event.controller');
const authController = require('../controllers/auth.controller');
const adminController = require('../controllers/admin.controller');
const runnerController = require('../controllers/runner.controller');

module.exports = router;

// HOMEPAGE
router.get('/', eventController.homePage); //

// REGISTER
router.get('/register', authController.registerForm);
router.post('/register', authController.register);
// router.post('/register', authController.register, authController.login);

// LOGIN & LOGOUT
router.get('/login', authController.loginForm);
router.post('/login', authController.login, eventController.homePage);
router.get('/logout', authController.logout);

// RUNNER ROUTES
/*
    profile
    event history
    registered events
    query events

    change email
    change password
    edit name
    withdraw from event
*/



// ADMIN ROUTES

/*
    get event registrants

    post event
    post results
    post pictures
    post reminder emails
    update event
*/