const mongoose = require('mongoose');
const _ = require('underscore');

const setTitle = (title) => _.escape(title).trim();
const setDesc = (description) => _.escape(description).trim();

const GoalSchema = new mongoose.Schema({
  // name of goal
  title: {
    type: String,
    required: true,
    trim: true,
    set: setTitle,
  },
  // description of goal
  description: {
    type: String,
    trim: true,
    set: setDesc,
  },
  // date the goal should be complete by
  endDate: {
    type: Date,
    required: true,
  },
  // user the goal is attached to
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  // time stamp of when the goal was made
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
