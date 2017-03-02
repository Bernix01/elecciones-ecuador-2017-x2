'use strict';

describe('Component: candidate', function() {
  // load the component's module
  beforeEach(module('testApp.candidate'));

  var candidateComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    candidateComponent = $componentController('candidate', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
