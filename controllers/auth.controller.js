const passport = require('passport');
const Runner = require('../models/runner.model');
const Email = require('../models/emailList.model');
const authServices = require('../services/auth.service');
const generalServices = require('../services/general.service');

exports.registerForm = (req, res) => {
    res.render('register', req.flash());
}

exports.loginForm = (req, res) => {
    res.render('login', req.flash());
}

exports.register = async (req, res, next) => {
    let { firstname, lastname, email, password, password2 } = req.body;

    // This redirect may change later
    let allInputsEntered = authServices.checkForInputs(firstname, lastname, email, password, password2);
    if (!allInputsEntered) {
        res.redirect('/register', { error: 'Please enter the requested info in each field' });
    }

    // This redirect may change later
    let validEmail = authServices.validateEmail(email);
    if (!validEmail) {
        // res.redirect('/register', { error: 'Please enter a valid email address' });
        res.send('Please enter a valid email address');
    }

    // This redirect may change later
    let matchingPasswords = authServices.passwordsMatch(password, password2);
    if (!matchingPasswords) {
        // res.redirect('/register', { error: 'Entered passwords do not match' });
        res.status(500).send('Entered passwords do not match');
    }

    // This redirect may change later
    let validPassword = authServices.passwordContainsCapLowNum(password);
    if (!validPassword) {
        res.redirect('/register', { error: 'Passwords must be 8 characters long and contain numbers and both lowercase and uppercase letters' });
    }

    firstname = generalServices.formatText(firstname);
    lastname = generalServices.formatText(lastname);

    let runnerEmail = await Runner.findOne({ email: email });
    if (runnerEmail) {
        res.status(500).send('This email address already exists');
        // res.redirect('/register', { error: 'This email address already exists' });
    }

    let newRunner = new Runner({
        firstname,
        lastname,
        email,
    });

    let newEmail = new Email({
        email,
    })

    try {
        let registeredRunner = await Runner.register(newRunner, req.body.password);
        await registeredRunner.save();
        console.log(registeredRunner);

        await newEmail.save();
        console.log(newEmail);

        res.send(registeredRunner);
        // res.redirect('/login'); // Redirect may need to change
    }
    catch (error) {
        console.log(error);
        // res.redirect('/register', { error: 'Could not add new runner' });
        res.send('Could not add new runner');
    }
}

exports.login = async (req, res, next) => {
    let email = req.body.email;
    let runner = await Runner.findOne({ email: email });

    if (runner) {
        let role = runner.role;
    }

    await passport.authenticate('local', {
        failureRedirect: '/login',
        failureFlash: 'username or password is incorrect',
        successRedirect: req.session.redirectTo || '/',
    })(req, res, next);
}

exports.logout = (req, res) => {
    req.session.cart = null,
        req.logout();
    req.flash('success', 'You are now logged out');
    res.redirect('/');
}

exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }

    req.session.redirectTo = req.path;

    res.redirect('/login');
}
