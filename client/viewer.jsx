const React = require('react');
const {createRoot} = require('react-dom/client');
const helper = require('./helper');
const { useState, useEffect } = React;

const DomoList = (props) => {
  const [domos, setDomos] = useState(props.domos);

  useEffect (() => {
    const loadDomosFromServer = async () => {
      const response = await fetch('/viewPage');
      const data = await response.json();
      setDomos (data.domos);
    };
    loadDomosFromServer();
  }, [props.reloadDomos]);

  if (domos.length === 0) {
    return (
      <div className="domoList">
        <h3 className="emptyDomo">No Domos Yet!</h3>
      </div>
    );
  }

  const domoNodes = domos.map(domo => {
    return (
      <div key={domo.id} className="domo">
        <h3 className="domoName">{domo.name}</h3>
        <img
          src="/assets/img/domo.png"
          alt="domo"
          className="domo"
          style={{
            height: `${domo.height * 100}px`,
            width: `${domo.width * 100}px`,
          }}/>
      </div>
    );
  });
  return (
    <div className="domoList">
      {domoNodes}
    </div>
  );
};

const App = () => {
  const [reloadDomos, setReloadDomos] = useState (false);
  return (
    <div>
      <div id="domos">
        <DomoList domos={[]} reloadDomos={reloadDomos} />
      </div>
    </div>
  );
};

const init = () => {
  const root = createRoot (document.getElementById('app')); root.render(<App /> );
};

window.onload = init;
