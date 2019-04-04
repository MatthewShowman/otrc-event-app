const Event = require('../models/event.model');

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

exports.findEvent = async (req, res) => {
    let requestedEvent = await Event.findOne({ _id: req.params.id });
    res.send(requestedEvent);
}

//5ca68a0bcd09ad0e3117ec06