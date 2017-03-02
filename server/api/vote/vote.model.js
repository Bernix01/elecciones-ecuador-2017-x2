'use strict';

import mongoose from 'mongoose';
import { registerEvents } from './vote.events';
import Candidate from '../candidate/candidate.model';

var VoteSchema = new mongoose.Schema({
    electorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate' }
});

VoteSchema.post('save', function(doc, next) {
    doc.count({ candidateId: doc.candidateId }, function(err, count) {
        count = err ? 0 : count;
        Candidate.findOneAndUpdate({ _id: doc.candidateId }, { votes: count }, function() {
            next();
        });
    });
});

registerEvents(VoteSchema);
export default mongoose.model('Vote', VoteSchema);
