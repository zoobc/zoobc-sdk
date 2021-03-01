// Licensed to the Quasisoft Limited - Hong Kong under one or more agreements
// The Quasisoft Limited - Hong Kong licenses this file to you under MIT license.

import './app.css';
import React, { useState } from 'react';
import BlockList from './BlockList';
import SignSendZBC from './SignSendZBC';
import TransactionFees from './TransactionFees';
import SignRegisterNode from './SignRegisterNode';
import SignSendZBCWithEid from './SignSendZBCWithEid';
import SignSendZBCWithEthereum from './SignSendZBCWithEthereum';
import LiquidTx from './Liquid'

const App = () => {
  const [appState, setAppState] = useState(0);

  let appContent = null;
  switch (appState) {
    case 1:
      appContent = <BlockList />;
      break;
    case 2:
      appContent = <SignSendZBC />;
      break;
    case 3:
      appContent = <SignRegisterNode />;
      break;
    case 4:
      appContent = <SignSendZBCWithEid />;
      break;
    case 5:
      appContent = <SignSendZBCWithEthereum />;
      break;
    case 6:
      appContent = <TransactionFees />;
      break;
    case 7:
      appContent= <LiquidTx />
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
          <a href="#SignSendZBC">Sign SendZBC</a>
        </li>
        <li onClick={() => setAppState(3)}>
          <a href="#SignRegisterNode">Sign RegisterNode</a>
        </li>
        <li onClick={() => setAppState(4)}>
          <a href="#SignSendZBCWithEid">Sign SendZBC with eID</a>
        </li>
        <li onClick={() => setAppState(5)}>
          <a href="#SignSendZBCWithEthereum">Sign SendZBC with ethereum</a>
        </li>
        <li onClick={() => setAppState(6)}>
          <a href="#TransactionFees">Transaction Fees</a>
        </li>
        <li onClick={() => setAppState(7)}>
          <a href="#LiquidTx">Liquid Transactions</a>
        </li>
      </ul>
      {appContent}
    </div>
  );
};

export default App;
