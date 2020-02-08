import mongoose from 'mongoose';
import { VoteSchema } from './Vote.js';

const UserSchema = new mongoose.Schema({
    name: String,
    votes: [VoteSchema]
});

export default mongoose.model('User', UserSchema);