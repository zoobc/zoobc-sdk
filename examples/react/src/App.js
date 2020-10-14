import React, { useState } from 'react';
import zoobc from '../../../';

import SignSendMoney from './SignSendMoney';
import SignRegisterNode from './SignRegisterNode';
import BlockList from './BlockList';
import './app.css';

const App = () => {
  const [appState, setAppState] = useState(0);

  let appContent = null;
  switch (appState) {
    case 1:
      appContent = <BlockList />;
      break;
    case 2:
      appContent = <SignSendMoney />;
      break;
    case 3:
      appContent = <SignRegisterNode />;
      break;
    default:
      appContent = null;
  }

  return (
    <div>
      <div>Sample Apps:</div>
      <ul>
        <li onClick={() => setAppState(1)}>
          <a href="#BlockList">BlockList</a>
        </li>
        <li onClick={() => setAppState(2)}>
          <a href="#SignSendMoney">Sign SendMoney</a>
        </li>
        <li onClick={() => setAppState(3)}>
          <a href="#SignRegisterNode">Sign RegisterNode</a>
        </li>
      </ul>
      {appContent}
    </div>
  );
};

export default App;
