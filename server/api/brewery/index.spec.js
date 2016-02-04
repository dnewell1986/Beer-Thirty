'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var breweryCtrlStub = {
  index: 'breweryCtrl.index',
  show: 'breweryCtrl.show',
  create: 'breweryCtrl.create',
  update: 'breweryCtrl.update',
  destroy: 'breweryCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var breweryIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './brewery.controller': breweryCtrlStub
});

describe('Brewery API Router:', function() {

  it('should return an express router instance', function() {
    breweryIndex.should.equal(routerStub);
  });

  describe('GET /api/breweries', function() {

    it('should route to brewery.controller.index', function() {
      routerStub.get
        .withArgs('/', 'breweryCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/breweries/:id', function() {

    it('should route to brewery.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'breweryCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/breweries', function() {

    it('should route to brewery.controller.create', function() {
      routerStub.post
        .withArgs('/', 'breweryCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/breweries/:id', function() {

    it('should route to brewery.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'breweryCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/breweries/:id', function() {

    it('should route to brewery.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'breweryCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/breweries/:id', function() {

    it('should route to brewery.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'breweryCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
