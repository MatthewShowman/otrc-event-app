const Event = require('../models/event.model');

module.exports = {
    checkForInputs,
    fetchEventByID,
};

function checkForInputs(eventName, eventDate, eventTime, eventLocation) {
    let inputsArray = [eventName, eventDate, eventTime, eventLocation];
    let hasInputs = true;

    for (let value of inputsArray) {
        if (value === "") {
            hasInputs = false;
        }
    }

    return hasInputs;
}

async function fetchEventByID(userRole, eventID) {
    let requestedEvent = await Event.findOne({ _id: eventID }, 'eventName eventDate eventTime eventLocation eventDescription runners')
        .populate('runners', 'firstname lastname');

    if (userRole !== "admin") {
        requestedEvent = {
            eventName: requestedEvent.eventName,
            eventDate: requestedEvent.eventDate,
            eventTime: requestedEvent.eventTime,
            eventLocation: requestedEvent.eventLocation,
            eventDescription: requestedEvent.eventDescription,
        };
    }

    return requestedEvent;
}