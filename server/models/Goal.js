const mongoose = require('mongoose');
const _ = require('underscore');

const setTitle = (title) => _.escape(title).trim();
const setDesc = (description) => _.escape(description).trim();

const GoalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    set: setTitle,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    set: setDesc,
  },
  endDate: {
    type: Date,
    required: true,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

// Converts a doc to something we can store in redis later on.
GoalSchema.statics.toAPI = (doc) => ({
  title: doc.name,
  description: doc.description,
  endDate: doc.endDate,
});

const GoalModel = mongoose.model('Goal', GoalSchema);
module.exports = GoalModel;
