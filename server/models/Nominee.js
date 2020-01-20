import mongoose from 'mongoose';

export const NomineeSchema = new mongoose.Schema({
  film: String,
  persons: [String]
});

export default mongoose.model('Nominee', NomineeSchema);