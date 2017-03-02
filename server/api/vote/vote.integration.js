'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newVote;

describe('Vote API:', function() {
  describe('GET /api/votes', function() {
    var votes;

    beforeEach(function(done) {
      request(app)
        .get('/api/votes')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          votes = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(votes).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/votes', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/votes')
        .send({
          name: 'New Vote',
          info: 'This is the brand new thing!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newVote = res.body;
          done();
        });
    });

    it('should respond with the newly created thing', function() {
      expect(newVote.name).to.equal('New Vote');
      expect(newVote.info).to.equal('This is the brand new thing!!!');
    });
  });

  describe('GET /api/votes/:id', function() {
    var thing;

    beforeEach(function(done) {
      request(app)
        .get(`/api/votes/${newVote._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          thing = res.body;
          done();
        });
    });

    afterEach(function() {
      thing = {};
    });

    it('should respond with the requested thing', function() {
      expect(thing.name).to.equal('New Vote');
      expect(thing.info).to.equal('This is the brand new thing!!!');
    });
  });

  describe('PUT /api/votes/:id', function() {
    var updatedVote;

    beforeEach(function(done) {
      request(app)
        .put(`/api/votes/${newVote._id}`)
        .send({
          name: 'Updated Vote',
          info: 'This is the updated thing!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedVote = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedVote = {};
    });

    it('should respond with the updated thing', function() {
      expect(updatedVote.name).to.equal('Updated Vote');
      expect(updatedVote.info).to.equal('This is the updated thing!!!');
    });

    it('should respond with the updated thing on a subsequent GET', function(done) {
      request(app)
        .get(`/api/votes/${newVote._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let thing = res.body;

          expect(thing.name).to.equal('Updated Vote');
          expect(thing.info).to.equal('This is the updated thing!!!');

          done();
        });
    });
  });

  describe('PATCH /api/votes/:id', function() {
    var patchedVote;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/votes/${newVote._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Vote' },
          { op: 'replace', path: '/info', value: 'This is the patched thing!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedVote = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedVote = {};
    });

    it('should respond with the patched thing', function() {
      expect(patchedVote.name).to.equal('Patched Vote');
      expect(patchedVote.info).to.equal('This is the patched thing!!!');
    });
  });

  describe('DELETE /api/votes/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/votes/${newVote._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when thing does not exist', function(done) {
      request(app)
        .delete(`/api/votes/${newVote._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
