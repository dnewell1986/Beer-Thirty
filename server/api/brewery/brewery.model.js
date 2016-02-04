'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var BrewerySchema = new mongoose.Schema({
    id: Number,
    name: String,
    address1: String,
    address2: String,
    city: String,
    State: String,
    code: Number,
    country: String,
    phone: String,
    website: String,
    last_modification: Date
});

export default mongoose.model('Brewery', BrewerySchema);
