'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var mongoosePaginate = require('mongoose-paginate');

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

BeerSchema.plugin(mongoosePaginate);

export default mongoose.model('Beer', BeerSchema);
