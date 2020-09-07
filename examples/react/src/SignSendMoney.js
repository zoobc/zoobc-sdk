import React, {useState} from 'react'
import TransportWebUSB from "@ledgerhq/hw-transport-webusb";

import { getZBCAddress, sendMoneyBuilder, writeInt32, ZooKeyring, Ledger } from '../../../';

const bytesToHexes = (byteArr) => {
  const a = []
  byteArr.forEach(item =>{const data = item.toString(16); data.length === 1? a.push(`0${data}`): a.push(data)})
  return a.join("")
}

const SignSendMoney = () => {
  const [accountIndex, setAccountIndex] = useState("")
  const [walletPublicKey, setWalletPublicKey] = useState("")
  const [publicKey, setPublicKey] = useState("")
  const [recipient, setRecipient] = useState("")
  const [amount, setAmount] = useState("")
  const [fee, setFee] = useState("")
  const [signature, setSignature] = useState("")
  const [walletSignature, setWalletSignature] = useState("")

  const resetDisplay = (isKeepPublicKey)=>{
    if (!isKeepPublicKey){
      setWalletPublicKey('')
      setPublicKey('')
    }
    setSignature('')
    setWalletSignature('')
  }

  // ======================================================================================================================================
  // Ledger communication
  // ======================================================================================================================================
  const getPublicKeyWithSDK = async ()=> {
    const accountIdxInt = parseInt(accountIndex)
    if (accountIndex === "" ||  accountIdxInt == NaN) return

    // get public key with SDK
    const seed = "very tooth oxygen lucky fat wolf demise arrest video squeeze hybrid sock siege galaxy remain radar panda loyal culture virus goose dolphin learn throw"
    const zooKeyring = new ZooKeyring(seed, "");
    const childSeed = zooKeyring.calcDerivationPath(accountIdxInt);
    const walletPublicKeyBytes = childSeed.publicKey
    setWalletPublicKey(getZBCAddress(walletPublicKeyBytes))

    // get public key with Ledger
    const transport = await Ledger.getUSBTransport()
    const ledgerCommunication = new Ledger(transport)
    const response = await ledgerCommunication.getPublicKey(accountIdxInt)
    setPublicKey(getZBCAddress(response))
  }

  const signTransaction = async (txBytes) => {
    const accountIdxInt = parseInt(accountIndex)
    if (!txBytes || txBytes.length === 0 || accountIdxInt == NaN) return

    // signing with keyring
    const seed = "very tooth oxygen lucky fat wolf demise arrest video squeeze hybrid sock siege galaxy remain radar panda loyal culture virus goose dolphin learn throw"
    const zooKeyring = new ZooKeyring(seed, "");
    const childSeed = zooKeyring.calcDerivationPath(accountIdxInt);
    const walletSignature = childSeed.sign(txBytes)
    setWalletSignature(bytesToHexes(walletSignature))

    // signing with Ledger
    setSignature('--Accept the signing in the ledger first--')
    const transport = await Ledger.getUSBTransport()
    const ledgerCommunication = new Ledger(transport)
    const response = await ledgerCommunication.signTransactionBytes(accountIdxInt, txBytes)
    setSignature(bytesToHexes(response))
  }
  // ======================================================================================================================================

  const handleChangeAccountIndex = ({target: {value} = {}, key} = {}) =>{
    if (key === 'Enter') {
      getPublicKeyWithSDK()
      return
    }
    setAccountIndex(value)
    resetDisplay()
  }

  const handleChangeRecipient = ({target: {value} = {}} = {}) =>{
    setRecipient(value)
    resetDisplay(true)
  }

  const handleChangeAmount = ({target: {value} = {}} = {}) =>{
    setAmount(value)
    resetDisplay(true)
  }

  const handleChangeFee = ({target: {value} = {}} = {}) =>{
    setFee(value)
    resetDisplay(true)
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
        <button onClick={getPublicKeyWithSDK}>Get Corresponding Public Key</button>
      </div>
      <div>
        <h4>Wallet/SDK Public Key:</h4>
        <p>{walletPublicKey || '--'}</p>
      </div>
      <div>
        <h4>Ledger Public Key:</h4>
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
        <h4>Wallet/SDK Signature:</h4>
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