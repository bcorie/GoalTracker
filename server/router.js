const controllers = require('./controllers');
const mid = require('./middleware');

// create 404 page
const notFound = (req, res) => {
  res.render('404');
};

const router = (app) => {
  app.get('/getGoals', mid.requiresLogin, controllers.Goal.getGoals);

  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  app.get('/maker', mid.requiresLogin, controllers.Goal.makerPage);
  app.post('/maker', mid.requiresLogin, controllers.Goal.makeGoal);

  // app.get('/viewer', mid.requiresLogin, controllers.Goal.viewPage);

  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);

  // default to 404 page, no middleware needed
  app.get('*', notFound);
};

module.exports = router;
