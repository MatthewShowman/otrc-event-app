const passport = require('passport');
const moment = require('moment');
const Runner = require('../models/runner.model');
const Event = require('../models/event.model');
const Email = require('../models/emailList.model');
const authServices = require('../services/auth.service');
const generalServices = require('../services/general.service');
const eventServices = require('../services/event.service');
const runnerServices = require('../services/runner.service');

/*
    addNewEvent
    editEvent
    deleteEvent

    searchRunnersByLastname

*/

exports.addNewEvent = async (req, res) => {
    let { eventName, eventDate, eventTime, eventLocation, eventDescription } = req.body;

    // This redirect may change later
    let allInputsEntered = eventServices.checkForInputs(eventName, eventDate, eventTime, eventLocation);
    if (!allInputsEntered) {
        // res.redirect('/events/new', { error: 'Please enter the requested info in each field' });
        res.status(400).send('Please enter the requested info in each field');
    }

    let eventDateTime = eventServices.createDate(eventDate, eventTime);
    console.log(eventDateTime);

    let newEvent = new Event({
        eventName,
        eventDateTime,
        eventLocation,
        eventDescription,
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
    let eventID = req.params.id;
    let updatedEvent = await Event.findOneAndUpdate({ _id: eventID }, req.body, { new: true });
    res.send(updatedEvent);
}

exports.deleteEvent = async (req, res, next) => {
    let eventID = req.params.id;
    await Event.findOneAndDelete({ _id: eventID });
    next();
}

exports.searchRunnersByLastname = async (req, res) => {
    let runnerLastname = req.query.lastname;
    let runners = await runnerServices.fetchRunnerByLastname(runnerLastname);
    res.send(runners);
}