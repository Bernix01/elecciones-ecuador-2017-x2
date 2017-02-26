'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newCandidate;

describe('Candidate API:', function() {
  describe('GET /api/candidates', function() {
    var candidates;

    beforeEach(function(done) {
      request(app)
        .get('/api/candidates')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          candidates = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(candidates).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/candidates', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/candidates')
        .send({
          name: 'New Candidate',
          info: 'This is the brand new candidate!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newCandidate = res.body;
          done();
        });
    });

    it('should respond with the newly created candidate', function() {
      expect(newCandidate.name).to.equal('New Candidate');
      expect(newCandidate.info).to.equal('This is the brand new candidate!!!');
    });
  });

  describe('GET /api/candidates/:id', function() {
    var candidate;

    beforeEach(function(done) {
      request(app)
        .get(`/api/candidates/${newCandidate._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          candidate = res.body;
          done();
        });
    });

    afterEach(function() {
      candidate = {};
    });

    it('should respond with the requested candidate', function() {
      expect(candidate.name).to.equal('New Candidate');
      expect(candidate.info).to.equal('This is the brand new candidate!!!');
    });
  });

  describe('PUT /api/candidates/:id', function() {
    var updatedCandidate;

    beforeEach(function(done) {
      request(app)
        .put(`/api/candidates/${newCandidate._id}`)
        .send({
          name: 'Updated Candidate',
          info: 'This is the updated candidate!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedCandidate = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCandidate = {};
    });

    it('should respond with the updated candidate', function() {
      expect(updatedCandidate.name).to.equal('Updated Candidate');
      expect(updatedCandidate.info).to.equal('This is the updated candidate!!!');
    });

    it('should respond with the updated candidate on a subsequent GET', function(done) {
      request(app)
        .get(`/api/candidates/${newCandidate._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let candidate = res.body;

          expect(candidate.name).to.equal('Updated Candidate');
          expect(candidate.info).to.equal('This is the updated candidate!!!');

          done();
        });
    });
  });

  describe('PATCH /api/candidates/:id', function() {
    var patchedCandidate;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/candidates/${newCandidate._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Candidate' },
          { op: 'replace', path: '/info', value: 'This is the patched candidate!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedCandidate = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedCandidate = {};
    });

    it('should respond with the patched candidate', function() {
      expect(patchedCandidate.name).to.equal('Patched Candidate');
      expect(patchedCandidate.info).to.equal('This is the patched candidate!!!');
    });
  });

  describe('DELETE /api/candidates/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/candidates/${newCandidate._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when candidate does not exist', function(done) {
      request(app)
        .delete(`/api/candidates/${newCandidate._id}`)
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
