import React, { useState } from 'react';
import zoobc from '../../../';

import SignSendMoney from './SignSendMoney';
import SignRegisterNode from './SignRegisterNode';
import SignSendMoneyWithEid from './SignSendMoneyWithEid';
import SignSendMoneyWithEthereum from './SignSendMoneyWithEthereum';
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
    case 4:
      appContent = <SignSendMoneyWithEid />;
      break;
    case 5:
      appContent = <SignSendMoneyWithEthereum />;
      break
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
        <li onClick={() => setAppState(4)}>
          <a href="#SignSendMoneyWithEid">Sign SendMoney with eID</a>
        </li>
        <li onClick={() => setAppState(5)}>
          <a href="#SignSendMoneyWithEthereum">Sign SendMoney with ethereum</a>
        </li>
      </ul>
      {appContent}
    </div>
  );
};

export default App;
