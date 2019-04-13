const Event = require('../models/event.model');

module.exports = {
    checkForInputs,
    fetchEventByID,
};

function checkForInputs(eventName, eventDate, eventTime, location) {
    let inputsArray = [eventName, eventDate, eventTime, location];
    let hasInputs = true;

    for (let value of inputsArray) {
        if (value === "") {
            hasInputs = false;
        }
    }

    return hasInputs;
}

async function fetchEventByID(userRole, eventID) {
    let requestedEvent = await Event.findOne({ _id: eventID }, 'eventName eventDate eventTime eventLocation runners')
        .populate('runners', 'firstname lastname');

    if (userRole !== "admin") {
        requestedEvent = {
            eventName: requestedEvent.eventName,
            eventDate: requestedEvent.eventDate,
            eventTime: requestedEvent.eventTime,
            eventLocation: requestedEvent.eventLocation,
        };
    }
    return requestedEvent;
}