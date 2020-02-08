import mongoose from 'mongoose';
import { NomineeSchema } from './Nominee.js';

const CategorySchema = new mongoose.Schema({
    title: String,
    nominees: [NomineeSchema],
    winner: {type: mongoose.Schema.Types.ObjectId, ref: 'Nominee'},
    isFilmNominated: Boolean
});

export default mongoose.model('Category', CategorySchema);