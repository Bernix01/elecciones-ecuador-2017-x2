/**
 * Candidate model events
 */

'use strict';

import {EventEmitter} from 'events';
var CandidateEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CandidateEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Candidate) {
  for(var e in events) {
    let event = events[e];
    Candidate.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    CandidateEvents.emit(event + ':' + doc._id, doc);
    CandidateEvents.emit(event, doc);
  };
}

export {registerEvents};
export default CandidateEvents;
