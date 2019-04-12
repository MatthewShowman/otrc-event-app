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
    let eventToReturn;
    if (userRole === "admin") {
        eventToReturn = {
            eventName: requestedEvent.eventName,
            eventDate: requestedEvent.eventDate,
            eventTime: requestedEvent.eventTime,
            eventLocation: requestedEvent.eventLocation,
            runners: {
                firstname: requestedEvent.runners.firstname,
                lastname: requestedEvent.runners.lastname,
            }
        };
    } else {
        eventToReturn = {
            eventName: requestedEvent.eventName,
            eventDate: requestedEvent.eventDate,
            eventTime: requestedEvent.eventTime,
            eventLocation: requestedEvent.eventLocation,
        };
    }
    return eventToReturn;
}