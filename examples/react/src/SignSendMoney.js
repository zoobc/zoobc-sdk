import React, {useState} from 'react'
import TransportWebUSB from "@ledgerhq/hw-transport-webusb";

import { getZBCAddress, sendMoneyBuilder, writeInt64, ZooKeyring } from '../../../';

const bytesToHexes = (byteArr) => {
  const a = []
  byteArr.forEach(item =>{const data = item.toString(16); data.length === 1? a.push(`0${data}`): a.push(data)})
  return a.join("")
}

const SignSendMoney = () => {
  const [accountIndex, setAccountIndex] = useState("")
  const [publicKey, setPublicKey] = useState("")
  const [recipient, setRecipient] = useState("")
  const [amount, setAmount] = useState("")
  const [fee, setFee] = useState("")
  const [signature, setSignature] = useState("")
  const [walletSignature, setWalletSignature] = useState("")

  // ======================================================================================================================================
  // Ledger communication
  // ======================================================================================================================================
  const getPublicKey = async ()=> {
    if (accountIndex === "" ||  parseInt(accountIndex) === NaN) return
    const bufferIdx = writeInt64(accountIndex).slice(0,4)
    console.log('debug account idx', bufferIdx)
    const transport = await TransportWebUSB.create();
    const response = await transport.send(0x80, 0x2, 0x00, 0x00, new Buffer([0x4,0x0,0x0,0x0, ...bufferIdx]))
    setPublicKey(getZBCAddress(response))
  }

  const signTransaction = async (txBytes) => {
    if (!txBytes || txBytes.length === 0) return

    // signing with keyring
    const seed = "very tooth oxygen lucky fat wolf demise arrest video squeeze hybrid sock siege galaxy remain radar panda loyal culture virus goose dolphin learn throw"
    const zooKeyring = new ZooKeyring(seed, "");
    const childSeed = zooKeyring.calcDerivationPath(0);
    const walletSignature = childSeed.sign(txBytes)
    setWalletSignature(bytesToHexes(walletSignature))

    const accountIdxBuffer = writeInt64(accountIndex).slice(0,4)
    const totalLength = txBytes.length + accountIdxBuffer.length
    const txByteLengthBuffer = writeInt64(totalLength).slice(0,4)
    console.log('debug sign transaction:', bytesToHexes([...txByteLengthBuffer, ...accountIdxBuffer, ...txBytes]))
    const transport = await TransportWebUSB.create();
    // 0e0000000000000068656c6c6f776f726c64
    // const response = await transport.send(0x80, 0x04, 0x00, 0x00, new Buffer([0x0e,0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x68,0x65,0x6c,0x6c,0x6f,0x77,0x6f,0x72,0x6c,0x64]))
    // const response = await transport.send(0x80, 0x03, 0x00, 0x00, new Buffer([...txByteLengthBuffer, ...txBytes]))
    // setSignature(bytesToHexes(response))


  }
  // ======================================================================================================================================


  // return <><button onClick={getPublicKey}>Get Public Key</button><div>publicKey: {publicKey &&publicKey.toString('hex').slice(0,-4)}</div></>


  const handleChangeAccountIndex = ({target: {value} = {}, key} = {}) =>{
    if (key === 'Enter') {
      getPublicKey()
    }
    setAccountIndex(value)
    setPublicKey('')
    setSignature('')
  }

  const handleChangeRecipient = ({target: {value} = {}} = {}) =>{
    setRecipient(value)
    setSignature('')
  }

  const handleChangeAmount = ({target: {value} = {}} = {}) =>{
    setAmount(value)
    setSignature('')
  }

  const handleChangeFee = ({target: {value} = {}} = {}) =>{
    setFee(value)
    setSignature('')
  }

  const buildTransaction = () =>{
    const txBytes = sendMoneyBuilder({
      sender: publicKey,
      recipient,
      fee: parseInt(fee),
      amount: parseInt(amount)
    })
    signTransaction(txBytes)
  }

  return (
    <div>
    <div style={{textAlign: 'center'}}>
      <div>
        <h4>Account Index:</h4>
        <input
        name="accountIndex"
        onChange={handleChangeAccountIndex}
        onKeyDown={handleChangeAccountIndex}
        value={accountIndex}/>
        <br/>
        <button onClick={getPublicKey}>Get Corresponding Public Key</button>
      </div>
      <div>
        <h4>Public Key:</h4>
        <p>{publicKey || '--'}</p>
      </div>
      <div>
        <h4>Recipient:</h4>
        <input name="recipient" onChange={handleChangeRecipient} value={recipient}/>
      </div>
      <div>
        <h4>Amount:</h4>
        <input name="amount" onChange={handleChangeAmount} value={amount}/>
      </div>
      <div>
        <h4>Fee:</h4>
        <input name="fee" onChange={handleChangeFee} value={fee}/>
      </div>
      <div>
        <br/>
        <button onClick={buildTransaction}>
          Sign Transaction
        </button>
      </div>
      <div>
        <h4>Wallet Signature:</h4>
        <p>{walletSignature || '--'}</p>
      </div>
      <div>
        <h4>Ledger Signature:</h4>
        <p>{signature || '--'}</p>
      </div>
    </div>
  </div>
  )
}

export default SignSendMoney