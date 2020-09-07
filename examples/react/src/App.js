import React, { useState } from 'react';
import zoobc from '../../../';

import SignSendMoney from './SignSendMoney';
import BlockList from './BlockList';
import './app.css';


const App = () => {
  const [appState, setAppState] = useState(0)

  let appContent = null
  switch(appState){
    case 1:
      appContent =  <BlockList/>
      break
    case 2:
      appContent = <SignSendMoney/>
      break
    default:
      appContent = null
  }

  return (
    <div>
      <div>Sample Apps:</div>
      <ul>
        <li onClick={()=>setAppState(1)}><a href="#BlockList">BlockList</a></li>
        <li onClick={()=>setAppState(2)}><a href="#SignSendMoney">SignSendMoney</a></li>
      </ul>
      {appContent}
    </div>
  )
}

export default App;
