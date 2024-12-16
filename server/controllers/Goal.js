const models = require('../models');

const { Goal } = models;

const makerPage = async (req, res) => res.render('app');

const makeGoal = async (req, res) => {
  if (!req.body.title || !req.body.endDate) {
    return res.status(400).json({ error: 'Need a title and date!' });
  }

  const GoalData = {
    title: req.body.title,
    description: req.body.description,
    endDate: req.body.endDate,
    owner: req.session.account._id,
  };

  try {
    const newGoal = new Goal(GoalData);
    await newGoal.save();
    return res.status(201).json({
      title: newGoal.title,
      description: newGoal.description,
      endDate: newGoal.endDate.toLocaleDateString(),
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Goal already exists!' });
    }
    return res.status(500).json({ error: 'An error occured making goal!' });
  }
};

const getGoals = async (req, res) => {
  try {
    const query = { owner: req.session.account._id };
    const docs = await Goal.find(query).select('title description endDate').lean().exec();
    return res.json({ goals: docs });
  } catch (err) {
    return res.status(500).json({ error: 'Error retrieving goals!' });
  }
};

module.exports = {
  makerPage,
  makeGoal,
  getGoals,
};
