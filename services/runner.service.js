const Runner = require('../models/runner.model');

module.exports = {
    fetchRunnerByLastname,
    fetchRunnerByID,
};

async function fetchRunnerByLastname(lastname) {
    return requestedRunner = await Runner.find({ lastname: lastname }, 'firstname lastname');
}

async function fetchRunnerByID(userRole, runnerID) {
    let requestedRunner = await Runner.findOne({ _id: runnerID })
        .populate('events');

    if (userRole !== "admin") {
        requestedRunner = {
            firstname: requestedRunner.firstname,
            lastname: requestedRunner.lastname,
            email: requestedRunner.email,
            events: requestedRunner.events,
        };
    }
    else {
        requestedRunner = {
            firstname: requestedRunner.firstname,
            lastname: requestedRunner.lastname,
            role: requestedRunner.role,
        };
    }
    return requestedRunner;
}