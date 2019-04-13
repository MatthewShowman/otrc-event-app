const Event = require('../models/event.model');
const eventServices = require('../services/event.service');

exports.homePage = (req, res) => {
    let role;
    if (req.user) {
        role = req.user.role;
        console.log(role);
    }
    else {
        role = "general";
    }
    res.render('home', { role, success: req.flash('success') });
}

/*
    fetchAllEvents
    fetchEvent
    updateEvent
    deleteEvent
    
*/

exports.fetchAllEvents = async (req, res) => {
    let allEvents = await Event.find();
    res.send(allEvents);
}


exports.fetchEvent = async (req, res) => {
    let eventID = req.params.id;
    let role = req.body.user.role || req.user.role;
    let requestedEvent = await eventServices.fetchEventByID(role, eventID);
    let listOfRunners = requestedEvent.runners;
    
    if(listOfRunners)
        res.send({requestedEvent, listOfRunners});
    else
        res.send(requestedEvent);
}

exports.deleteEvent = async (req, res) => {
    let eventID = req.params.id;
    let deleteThisEvent = findOneAndDelete({_id: eventID});
    res.send(deleteThisEvent);
}