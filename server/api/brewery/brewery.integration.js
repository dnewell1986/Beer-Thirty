'use strict';

var app = require('../..');
import request from 'supertest';

var newBrewery;

describe('Brewery API:', function() {

  describe('GET /api/breweries', function() {
    var brewerys;

    beforeEach(function(done) {
      request(app)
        .get('/api/breweries')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          brewerys = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      brewerys.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/breweries', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/breweries')
        .send({
          name: 'New Brewery',
          info: 'This is the brand new brewery!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newBrewery = res.body;
          done();
        });
    });

    it('should respond with the newly created brewery', function() {
      newBrewery.name.should.equal('New Brewery');
      newBrewery.info.should.equal('This is the brand new brewery!!!');
    });

  });

  describe('GET /api/breweries/:id', function() {
    var brewery;

    beforeEach(function(done) {
      request(app)
        .get('/api/breweries/' + newBrewery._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          brewery = res.body;
          done();
        });
    });

    afterEach(function() {
      brewery = {};
    });

    it('should respond with the requested brewery', function() {
      brewery.name.should.equal('New Brewery');
      brewery.info.should.equal('This is the brand new brewery!!!');
    });

  });

  describe('PUT /api/breweries/:id', function() {
    var updatedBrewery;

    beforeEach(function(done) {
      request(app)
        .put('/api/breweries/' + newBrewery._id)
        .send({
          name: 'Updated Brewery',
          info: 'This is the updated brewery!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedBrewery = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedBrewery = {};
    });

    it('should respond with the updated brewery', function() {
      updatedBrewery.name.should.equal('Updated Brewery');
      updatedBrewery.info.should.equal('This is the updated brewery!!!');
    });

  });

  describe('DELETE /api/breweries/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/breweries/' + newBrewery._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when brewery does not exist', function(done) {
      request(app)
        .delete('/api/breweries/' + newBrewery._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
