'use strict';

import mongoose from 'mongoose';
import { registerEvents } from './candidate.events';

var CandidateSchema = new mongoose.Schema({
    name: String,
    info: String,
    pimage: String,
    active: Boolean
});

registerEvents(CandidateSchema);
export default mongoose.model('Candidate', CandidateSchema);
