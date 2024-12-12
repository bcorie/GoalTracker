const React = require('react');
const {createRoot} = require('react-dom/client');
const helper = require('./helper');

const handleLogin = (e) => {
  e.preventDefault();
  helper.hideError();

  const username = e.target.querySelector('#user').value;
  const pass = e.target.querySelector('#pass').value;

  if (!username || !pass) {
    helper.handleError('Username or password is empty!');
    return false;
  }

  helper.sendPost(e.target.action, { username, pass });
  return false;
};

const handleSignup = (e) => {
  e.preventDefault();
  helper.hideError();

  const username = e.target.querySelector('#user').value;
  const pass = e.target.querySelector('#pass').value;
  const pass2 = e.target.querySelector('#pass2').value;

  if (!username || !pass || !pass2) {
    helper.handleError('All fields are required!');
    return false;
  }

  if (pass !== pass2) {
    helper.handleError('Passwords do not match!');
    return false;
  }

  helper.sendPost(e.target.action, { username, pass, pass2 });
  return false;
};

const LoginWindow = (props) => {
  return (
    <form id='loginForm'
      name='loginForm'
      onSubmit={handleLogin}
      action='/login'
      method='POST'
      className='mainForm'
    >
      <h1 class="display-font">Goal Tracker</h1>
      <h2 class="header-font-italic">Welcome back!</h2>
      <input id='user' type='text' class="text-font"name='username' placeholder='Username' />
      <input id='pass' type='password' class="text-font"name='pass' placeholder='Password' />
      <input className='formSubmit' class="text-font" type='submit' value='Log in' />
    </form>
  )
};

const SignupWindow = (props) => {
  return (
    <form id='signupForm'
      name='signupForm'
      onSubmit={handleSignup}
      action='/signup'
      method='POST'
      className='mainForm'
    >
      <input id='user' type='text' class="text-font" name='username' placeholder='Username' />
      <input id='pass' type='password' class="text-font" name='pass' placeholder='Password' />
      <input id='pass2' type='password' class="text-font" name='pass2' placeholder='Confirm password' />
      <input className='formSubmit' class="text-font" type='submit' value='Sign in' />
    </form>
  )
};

const init = () => {
  const loginButton = document.querySelector('#loginButton');
  const signupButton = document.querySelector('#signupButton');

  const root = createRoot(document.querySelector('#content'));

  loginButton.addEventListener('click', (e) => {
    e.preventDefault();
    root.render( <LoginWindow />);
    return false;
  });

  signupButton.addEventListener('click', (e) => {
    e.preventDefault();
    root.render( <SignupWindow />);
    return false;
  });

  root.render( <LoginWindow />);
};

window.onload = init;