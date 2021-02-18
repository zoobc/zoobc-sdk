// Licensed to the Quasisoft Limited - Hong Kong under one or more agreements
// The Quasisoft Limited - Hong Kong licenses this file to you under MIT license.

import './app.css';
import React, { useState } from 'react';
import BlockList from './BlockList';
import SignSendMoney from './SignSendMoney';
import TransactionFees from './TransactionFees';
import SignRegisterNode from './SignRegisterNode';
import SignSendMoneyWithEid from './SignSendMoneyWithEid';
import SignSendMoneyWithEthereum from './SignSendMoneyWithEthereum';

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
      break;
    case 6:
      appContent = <TransactionFees />;
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
        <li onClick={() => setAppState(4)}>
          <a href="#SignSendMoneyWithEid">Sign SendMoney with eID</a>
        </li>
        <li onClick={() => setAppState(5)}>
          <a href="#SignSendMoneyWithEthereum">Sign SendMoney with ethereum</a>
        </li>
        <li onClick={() => setAppState(6)}>
          <a href="#TransactionFees">Transaction Fees</a>
        </li>
      </ul>
      {appContent}
    </div>
  );
};

export default App;
