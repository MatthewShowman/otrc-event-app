const passport = require('passport');
const Runner = require('../models/runner.model');
const Event = require('../models/event.model');
const Email = require('../models/emailList.model');
const authServices = require('../services/auth.service');
const generalServices = require('../services/general.service');
const eventServices = require('../services/event.service');

/*
    registerForEvent

*/

exports.registerForEvent = async (req, res) => {
    let requestedEvent = await Event.findOne({ _id: req.params.id });
    let currentRunner = await Runner.findOne({ _id: req.body.user.id || req.user.id });

    requestedEvent.runners.push(currentRunner._id);
    currentRunner.events.push(requestedEvent._id);
    newRunnerInfo = await currentRunner.save();
    newEventInfo = await requestedEvent.save();

    const InfoToReturn = {
        runner: newRunnerInfo,
        event: newEventInfo,
    }

    res.send(InfoToReturn);

}