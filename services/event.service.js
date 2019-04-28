const Event = require('../models/event.model');
const DateTime = require('luxon').DateTime;

module.exports = {
    checkForInputs,
    createDate,
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

function createDate(eventDate, eventTime) {
    let dateArray = eventDate.split('-');
    let timeArray = eventTime.split(':');
    let eventTimeDate = DateTime.fromObject({
        year: dateArray[0],
        month: dateArray[1],
        day: dateArray[2],
        hour: timeArray[0],
        minute: timeArray[1],
    });
    console.log(eventTimeDate);
    return eventTimeDate;
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