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
router.post('/login', authController.login);
router.get('/logout', authController.logout);


// RUNNER ROUTES
router.get('/events', eventController.eventsPage);
router.get('/events/:id', eventController.fetchEvent);
router.get('/runner/:id', runnerController.fetchRunner);
router.patch('/runner/:id', runnerController.editRunner);
router.post('/events/:id', runnerController.registerForEvent);

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
router.get('/runner', adminController.searchRunnersByLastname);
router.post('/new-event', adminController.addNewEvent);
router.patch('/events/:id', adminController.editEvent);
router.delete('/events/:id', adminController.deleteEvent, eventController.fetchAllEvents);
/*
    get event registrants

    post event
    post results
    post pictures
    post reminder emails
    update event
*/