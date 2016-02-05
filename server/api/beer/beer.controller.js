/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/beers              ->  index
 * POST    /api/beers              ->  create
 * GET     /api/beers/:id          ->  show
 * PUT     /api/beers/:id          ->  update
 * DELETE  /api/beers/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
var status = require('http-status');
var Beer = require('./beer.model');

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function (err) {
        res.status(statusCode).send(err);
    };
}

function responseWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function (entity) {
        if (entity) {
            res.status(statusCode).json(entity);
        }
    };
}

function handleEntityNotFound(res) {
    return function (entity) {
        if (!entity) {
            res.status(404).end();
            return null;
        }
        return entity;
    };
}

function saveUpdates(updates) {
    return function (entity) {
        var updated = _.merge(entity, updates);
        return updated.saveAsync()
            .spread(updated => {
                return updated;
            });
    };
}

function removeEntity(res) {
    return function (entity) {
        if (entity) {
            return entity.removeAsync()
                .then(() => {
                    res.status(204).end();
                });
        }
    };
}

// Gets a list of Beers
export function index(req, res) {
	var offset = parseInt(req.params.offset);
	Beer.paginate({}, {sort: {name: -1}, offset: offset, limit: 10})
		.then(responseWithResult(res))
		.catch(handleError(res));
}

// Gets a single Beer from the DB
export function show(req, res) {
    Beer.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(responseWithResult(res))
        .catch(handleError(res));
}

export function getByName(req, res) {
    Beer.findOneAsync({'name': req.params.name})
        .then(handleEntityNotFound(res))
        .then(responseWithResult(res))
        .catch(handleError(res));
}

// Creates a new Beer in the DB
export function create(req, res) {
    Beer.createAsync(req.body)
        .then(responseWithResult(res, 201))
        .catch(handleError(res));
}

// Updates an existing Beer in the DB
export function update(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Beer.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(saveUpdates(req.body))
        .then(responseWithResult(res))
        .catch(handleError(res));
}

// Deletes a Beer from the DB
export function destroy(req, res) {
    Beer.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
}
