module.exports = {
    checkForInputs,
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