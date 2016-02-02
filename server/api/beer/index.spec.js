'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var beerCtrlStub = {
  index: 'beerCtrl.index',
  show: 'beerCtrl.show',
  create: 'beerCtrl.create',
  update: 'beerCtrl.update',
  destroy: 'beerCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var beerIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './beer.controller': beerCtrlStub
});

describe('Beer API Router:', function() {

  it('should return an express router instance', function() {
    beerIndex.should.equal(routerStub);
  });

  describe('GET /api/beers', function() {

    it('should route to beer.controller.index', function() {
      routerStub.get
        .withArgs('/', 'beerCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/beers/:id', function() {

    it('should route to beer.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'beerCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/beers', function() {

    it('should route to beer.controller.create', function() {
      routerStub.post
        .withArgs('/', 'beerCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/beers/:id', function() {

    it('should route to beer.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'beerCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/beers/:id', function() {

    it('should route to beer.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'beerCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/beers/:id', function() {

    it('should route to beer.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'beerCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
