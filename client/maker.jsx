const React = require('react');
const {createRoot} = require('react-dom/client');
const helper = require('./helper');
const { useState, useEffect } = React;

const handleGoal = (e, onGoalAdded) => {
  e.preventDefault();
  helper.hideError();

  const title = e.target.querySelector('#goalTitle').value;
  const description = e.target.querySelector('#goalDescription').value;
  const endDate = e.target.querySelector('#goalEndDate').value;

  // check for required fields
  if (!title || !endDate) {
    helper.openError('All fields are required!');
    return false;
  }

  // check for date
  const enteredDate = new Date(endDate);
  if (enteredDate.getUTCMilliseconds() <= Date.now()) {
    helper.openError('Pick a future date!');
    return false;
  }

  helper.sendPost(e.target.action, { title, description, endDate }, onGoalAdded);
  return false;
};

const GoalForm = (props) => {
  return (
    <form id='goalForm'
      name='goalForm'
      onSubmit={(e) => handleGoal(e, props.triggerReload)}
      action='/maker'
      method='POST'
      className='goalForm'
    >
      <input id='goalTitle' type='text' class="header-font-regular" name='title' placeholder='Title'/>
      <textarea id='goalDescription' type='text' class="text-font" name='description' placeholder='Description'/>
      <div id="dateFormSection">
        <label htmlFor='endDate' class="text-font">Complete by: </label>
        <input id='goalEndDate' type='date' min={Date.now()} name='endDate'/>
      </div>
      <input id='makeGoalSubmit' type='submit' class="text-font" value='Create' />

      <div id="errorModal" class="hidden">
        <span id="close" onClick={() => helper.hideError()}>&times;</span>
        <p id="errorMessage" class="header-font-italic"></p>
      </div>

    </form>
  );
};

const GoalList = (props) => {
  const [goals, setGoals] = useState(props.goals);

  useEffect (() => {
    const loadGoalsFromServer = async () => {
      const response = await fetch('/getGoals');
      const data = await response.json();
      setGoals (data.goals);
    };
    loadGoalsFromServer();
  }, [props.reloadGoals]);

  if (!goals || goals.length === 0) {
    return (
      <div className="goalList">
        <h3 className="emptyGoal header-font-regular">No Goals Yet!</h3>
      </div>
    );
  }

  const goalNodes = goals.map(goal => {
    const convertedDate = new Date(goal.endDate);
    return (
      <div key={goal.id} className="goal">
        <h3 className="goalTitle header-font-regular"><strong>{goal.title}</strong></h3>
        <h3 className="goalDescription text-font">{goal.description}</h3>
        <h3 className="goalEndDate text-font">Complete by <strong>{convertedDate.toLocaleDateString()}</strong></h3>
      </div>
    );
  });

  return (
    <div className="goalListViewer">
      {goalNodes}
    </div>
  );
};

const App = () => {
  const [reloadGoals, setReloadGoals] = useState (false);

  return (
    <div>
      <div id="makeGoal">
        <h2 class="header-font-italic">Create a goal!</h2>
        <GoalForm triggerReload={() => setReloadGoals(!reloadGoals)} />
      </div>
      <div id="goals">
        <h2 class="header-font-italic">Upcoming Goals</h2>
        <hr />
        <GoalList goals={[]} reloadGoals={reloadGoals} />
      </div>
    </div>
  );
};

const init = () => {
  const root = createRoot (document.querySelector('#app')); root.render(<App /> );
};

window.onload = init;
