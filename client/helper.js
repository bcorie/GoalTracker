/* Takes in an error message. Sets the error message up in html, and
  displays it to the user. Will be hidden by other events that could
  end in an error.
*/
const handleError = (message) => {
  //TODO: update for new error message UI
  document.querySelector('#errorMessage').textContent = message;
  document.querySelector('#domoMessage').classList.remove('hidden');
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

  //TODO: update for new error message UI
  const result = await response.json();
  document.querySelector('#domoMessage').classList.add('hidden');

  if (result.redirect) {
    window.location = result.redirect;
  }

  if (result.error) {
    handleError(result.error);
  }

  if (handler) {
    handler(result);
  }
};

const hideError = () => {
  //TODO: update for new error message UI
  document.querySelector('#domoMessage').classList.add('hidden');
};

module.exports = {
  handleError,
  sendPost,
  hideError,
};
