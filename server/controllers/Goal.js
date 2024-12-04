const models = require('../models');

const { Goal } = models;

const makerPage = async (req, res) => res.render('app');

const makeGoal = async (req, res) => {
  if (!req.body.title || !req.body.description || !req.body.endDate) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  const GoalData = {
    title: req.body.name,
    description: req.body.age,
    endDate: req.body.endDate,
    owner: req.session.account._id,
  };

  try {
    const newGoal = new Goal(GoalData);
    await newGoal.save();
    return res.status(201).json({
      title: newGoal.title,
      description: newGoal.description,
      endDate: newGoal.endDate,
    });
  } catch (err) {
    console.log(err);
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

    return res.json({ Goals: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving goals!' });
  }
};

// const viewPage = async (req, res) => {
//   try {
//     const query = { owner: req.session.account._id };
//     const docs = await Goal.find(query).select('title height').lean().exec();

//     return res.json({ Goals: docs });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ error: 'Error retrieving goals!' });
//   }
// };

module.exports = {
  makerPage,
  makeGoal,
  getGoals,
  // viewPage,
};
