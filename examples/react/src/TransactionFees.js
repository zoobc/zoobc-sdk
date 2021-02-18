import React, { useState } from 'react';
import { transactionFees } from '../../../';

export default () => {
  const [hour, setHour] = useState(2);
  const [message, setMessage] = useState('');
  const [fee, setFee] = useState(0);

  const onChangeHour = event => {
    setHour(event.target.value);
    calcFees();
  };

  const onChangeMessage = event => {
    setMessage(event.target.value);
    calcFees();
  };

  const calcFees = () => {
    const strLength = message.length;
    const result = transactionFees(parseInt(strLength), parseInt(hour));
    setFee(result);
  };

  return (
    <>
      <h4>Transaction Fees</h4>
      <form>
        <label>
          Hour : <input type="number" value={hour} onChange={onChangeHour} />
        </label>
        <br />
        <br />
        <label>
          Message : <textarea rows={3} value={message} onChange={onChangeMessage} />
        </label>
        <br />
        <br />
        Calculate Fees : <strong>{fee}</strong>
      </form>
    </>
  );
};
