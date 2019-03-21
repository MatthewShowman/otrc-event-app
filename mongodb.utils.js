//createEventListeners
//connect
//disconnect

const mongoose = require('mongoose');

module.exports = {
    connect,
    disconnect,
    createEventListeners,
}

function connect() {
    mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds121176.mlab.com:21176/otrc-test-app', { useNewUrlParser: true });
    // mongoose.connect('mongodb://localhost/shoestore', { useNewUrlParser: true });
}

// function connect() {
//     let mongoURL = process.env.SHOESTORE_MONGO_URL || 'mongodb://localhost/otrc-app';
//     mongoose.connect(mongoURL, { useNewUrlParser: true })
// }

function disconnect() {
    mongoose.disconnect();
}

function createEventListeners() {
    mongoose.connection.once('connected', () => {
        console.log('connected to mlab database');
    });

    mongoose.connection.on('error', () => {
        console.log('error connecting to mlab database');
    });
}