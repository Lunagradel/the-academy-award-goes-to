import mongoose from 'mongoose';

export const VoteSchema = new mongoose.Schema({
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
    willWin: {type: mongoose.Schema.Types.ObjectId, ref: 'Nominee'},
    shouldWin: {type: mongoose.Schema.Types.ObjectId, ref: 'Nominee'}
});

export default mongoose.model('Vote', VoteSchema);