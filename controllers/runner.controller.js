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
    let currentRunner =
        console.log(raceParticipants);

}