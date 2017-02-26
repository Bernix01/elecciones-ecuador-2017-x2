'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './vote.events';

var VoteSchema = new mongoose.Schema({
  electorId:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  candidateId:{type: mongoose.Schema.Types.ObjectId, ref: 'Candidate'}
});

registerEvents(VoteSchema);
export default mongoose.model('Vote', VoteSchema);
