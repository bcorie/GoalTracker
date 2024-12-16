const React = require('react');
const {createRoot} = require('react-dom/client');

// React component for page content
const NotFoundContent = (props) => {
  return (
    <div>
      <h1 class="display-font">404: Page Not Found</h1>
      <p class="text-font">The page you're looking for does not exist.</p>
      <a href="/" id="home-link" class="text-font">Back to Home</a>
      </div>
  );
};

const init = () => {
  const root = createRoot(document.querySelector('#not-found-content'));
  root.render(<NotFoundContent /> );
};

window.onload = init;
