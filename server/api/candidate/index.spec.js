'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var candidateCtrlStub = {
  index: 'candidateCtrl.index',
  show: 'candidateCtrl.show',
  create: 'candidateCtrl.create',
  upsert: 'candidateCtrl.upsert',
  patch: 'candidateCtrl.patch',
  destroy: 'candidateCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var candidateIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './candidate.controller': candidateCtrlStub
});

describe('Candidate API Router:', function() {
  it('should return an express router instance', function() {
    expect(candidateIndex).to.equal(routerStub);
  });

  describe('GET /api/candidates', function() {
    it('should route to candidate.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'candidateCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/candidates/:id', function() {
    it('should route to candidate.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'candidateCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/candidates', function() {
    it('should route to candidate.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'candidateCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/candidates/:id', function() {
    it('should route to candidate.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'candidateCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/candidates/:id', function() {
    it('should route to candidate.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'candidateCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/candidates/:id', function() {
    it('should route to candidate.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'candidateCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
