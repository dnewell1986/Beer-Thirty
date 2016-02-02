'use strict';

var app = require('../..');
import request from 'supertest';

var newBeer;

describe('Beer API:', function() {

  describe('GET /api/beers', function() {
    var beers;

    beforeEach(function(done) {
      request(app)
        .get('/api/beers')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          beers = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      beers.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/beers', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/beers')
        .send({
          name: 'New Beer',
          info: 'This is the brand new beer!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newBeer = res.body;
          done();
        });
    });

    it('should respond with the newly created beer', function() {
      newBeer.name.should.equal('New Beer');
      newBeer.info.should.equal('This is the brand new beer!!!');
    });

  });

  describe('GET /api/beers/:id', function() {
    var beer;

    beforeEach(function(done) {
      request(app)
        .get('/api/beers/' + newBeer._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          beer = res.body;
          done();
        });
    });

    afterEach(function() {
      beer = {};
    });

    it('should respond with the requested beer', function() {
      beer.name.should.equal('New Beer');
      beer.info.should.equal('This is the brand new beer!!!');
    });

  });

  describe('PUT /api/beers/:id', function() {
    var updatedBeer;

    beforeEach(function(done) {
      request(app)
        .put('/api/beers/' + newBeer._id)
        .send({
          name: 'Updated Beer',
          info: 'This is the updated beer!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedBeer = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedBeer = {};
    });

    it('should respond with the updated beer', function() {
      updatedBeer.name.should.equal('Updated Beer');
      updatedBeer.info.should.equal('This is the updated beer!!!');
    });

  });

  describe('DELETE /api/beers/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/beers/' + newBeer._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when beer does not exist', function(done) {
      request(app)
        .delete('/api/beers/' + newBeer._id)
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
