/**
 * Thing model events
 */

'use strict';

import {EventEmitter} from 'events';
var VoteEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
VoteEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  update: 'update',
  count: 'count'
};

// Register the event emitter to the model events
function registerEvents(Vote) {
  for(var e in events) {
    let event = events[e];
    Vote.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    VoteEvents.emit(`${event}:${doc._id}`, doc);
    VoteEvents.emit(event, doc);
  };
}

export {registerEvents};
export default VoteEvents;
