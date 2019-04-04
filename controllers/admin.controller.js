const passport = require('passport');
const Runner = require('../models/runner.model');
const Event = require('../models/event.model');
const Email = require('../models/emailList.model');
const authServices = require('../services/auth.service');
const generalServices = require('../services/general.service');
const eventServices = require('../services/event.service');

/*
    addNewEvent
    editEvent

*/

exports.addNewEvent = async (req, res) => {
    let { eventName, eventDate, eventTime, location } = req.body;

    // This redirect may change later
    let allInputsEntered = eventServices.checkForInputs(eventName, eventDate, eventTime, eventLocation);
    if (!allInputsEntered) {
        res.redirect('/events/add', { error: 'Please enter the requested info in each field' });
    }

    // let runners = '';

    let newEvent = new Event({
        eventName,
        eventDate,
        eventTime,
        location,
    });

    try {
        await newEvent.save();
        console.log(newEvent);

        res.send(newEvent);
        // res.redirect('/events'); // Redirect may need to change
    }
    catch (error) {
        console.log(error);
        // res.redirect('/events', { error: 'Could not add new event' });
        res.send('Could not add new event');
    }
}

exports.editEvent = async (req, res) => {

}