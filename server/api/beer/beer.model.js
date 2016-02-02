'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var BeerSchema = new mongoose.Schema({
    id: {type: String, required: true},
    breweryId: {type: Number, required: true},
    name: {type: String, required: true},
    catId: {type: Number},
    styleId: Number,
    abv: Number,
    ibu: Number,
    srm: Number,
    upc: String,
    filepath: String,
    description: String,
    last_mod: Date
});

export default mongoose.model('Beer', BeerSchema);
