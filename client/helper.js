// const React = require('react');

// const ErrorModal = (message) => {

//   return (
//   <div id="errorModal">
//     <span id="close" onclick={hideError}>&times;</span>
//     <p id="errorMessage"></p>
//     <p id="suggestion"></p>
//  </div>
//   )
// }

/* Takes in an error message. Sets the error message up in html, and
  displays it to the user. Will be hidden by other events that could
  end in an error.
*/
const openError = (message) => {
  document.querySelector('#errorMessage').textContent = message;
  document.querySelector('#errorModal').classList.remove('hidden');
  // return <p id="errorMessage"></p>;
};

/* Sends post requests to the server using fetch. Will look for various
  entries in the response JSON object, and will handle them appropriately.
*/
const sendPost = async (url, data, handler) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  document.querySelector('#errorModal').classList.add('hidden');

  if (result.redirect) {
    window.location = result.redirect;
  }

  if (result.error) {
    openError(result.error);
  }

  if (handler) {
    handler(result);
  }
};

const hideError = () => {
  document.querySelector('#errorModal').classList.add('hidden');
};

module.exports = {
  openError,
  sendPost,
  hideError,
};

// export default ErrorModal;
