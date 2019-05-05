const Event = require('../models/event.model');
const eventServices = require('../services/event.service');

exports.homePage = (req, res) => {
    if (req.runner) {
        let role = req.runner.role;
        console.log(role);
        res.redirect(`/${role}/`);
    }
    else {
        res.render('general-layout', { success: req.flash('success') });
    }
    // res.send(role + ' is logged in');
}

/*
    fetchAllEvents
    eventsPage
    fetchEvent
    updateEvent
    
*/

exports.fetchAllEvents = async (req, res) => {
    let allEvents = await Event.find();
    res.send(allEvents);
}

exports.eventsPage = async (req, res) => {
    let allEvents = await Event.find({ eventDateTime: { $gte: Date.now() } });
    res.render('events', { allEvents });
}

exports.fetchEvent = async (req, res) => {
    let eventID = req.params.id;
    let role = req.body.user.role || req.user.role;
    let requestedEvent = await eventServices.fetchEventByID(role, eventID);
    let listOfRunners = requestedEvent.runners;

    if (listOfRunners)
        res.send({ requestedEvent, listOfRunners });
    else
        res.send(requestedEvent);
}
