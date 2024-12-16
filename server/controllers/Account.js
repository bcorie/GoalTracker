const models = require('../models');

const { Account } = models;

// load login page
const loginPage = (req, res) => {
  res.render('login');
};

// load logged-out page
const logout = (req, res) => {
  req.session.destroy(); // removes user session
  res.redirect('/');
};

// attempt login
const login = (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;

  // check for all fields
  if (!username || !pass) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  // authenticate
  return Account.authenticate(username, pass, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong username or password!' });
    }

    req.session.account = Account.toAPI(account);

    // enter app
    return res.json({ redirect: '/maker' });
  });
};

// attempt signup
const signup = async (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;
  const pass2 = `${req.body.pass2}`;

  // check for all fields
  if (!username || !pass || !pass2) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  // check for pass match
  if (pass !== pass2) {
    return res.status(400).json({ error: 'Passwords do not match!' });
  }

  try {
    // create account
    const hash = await Account.generateHash(pass);
    const newAccount = new Account({ username, password: hash });
    await newAccount.save();
    req.session.account = Account.toAPI(newAccount);
    return res.json({ redirect: '/maker' });
  } catch (err) {
    // existing username
    if (err.code === 11000) {
      return res.status(404).json({ error: 'Username already in use!' });
    }
    // other error
    return res.status(500).json({ error: 'An error occured! ' });
  }
};

module.exports = {
  loginPage,
  login,
  logout,
  signup,
};
