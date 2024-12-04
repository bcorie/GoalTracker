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

  if (!title || !description || !endDate) {
    helper.handleError('All fields are required!');
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
      <label htmlFor='title'>Title: </label>
      <input id='goalTitle' type='text' name='title' placeholder='Goal title' />
      <label htmlFor='description'>Description: </label>
      <input id='goalDescription' type='text' name='description' placeholder='Description'/>
      <label htmlFor='endDate'>End Date: </label>
      <input id='goalEndDate' type='date' min={Date.now()} name='endDate' />
      <input className='makeGoalSubmit' type='submit' value='Make Goal' />
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

  if (goals.length === 0) {
    return (
      <div className="goalList">
        <h3 className="emptyGoal">No Goals Yet!</h3>
      </div>
    );
  }

  const goalNodes = goals.map(goal => {
    return (
      <div key={goal.id} className="goal">
        <img src="/assets/img/domoface.jpeg" alt="domo face" className="domoFace" />
        <h3 className="goalTitle">Title: {goal.title}</h3>
        <h3 className="goalDescription">Description: {goal.description}</h3>
        <h3 className="goalEndDate">End Date: {goal.endDate}</h3>
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
        <GoalForm triggerReload={() => setReloadGoals(!reloadGoals)} />
      </div>
      <div id="goals">
        <GoalList goals={[]} reloadGoals={reloadGoals} />
      </div>
    </div>
  );
};

const init = () => {
  const root = createRoot (document.getElementById('app')); root.render(<App /> );
};

window.onload = init;
