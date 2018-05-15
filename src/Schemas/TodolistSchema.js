import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const Todolist = new Schema({
  title: {
    type: String,
    required: [true, 'Title task required']
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'done', 'cancel'],
    description: 'can only be one of the enum values and is required',
    default: 'pending'
  },
  content: {
    type: String,
  }
});

export default mongoose.model('Todolist', Todolist);
