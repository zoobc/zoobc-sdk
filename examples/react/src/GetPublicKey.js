import React, {useState} from 'react'
import TransportWebUSB from "@ledgerhq/hw-transport-webusb";

const GetPublicKey = () => {
  const [publicKey, setPublicKey] = useState("")
  const getPublicKey = async ()=> {
    const transport = await TransportWebUSB.create();
    const response = await transport.send(0x80, 0x2, 0x00, 0x00, new Buffer([0x4,0x0,0x0,0x0,0x0,0x0,0x0,0x0]))
    setPublicKey(response)
  }

  return <><button onClick={getPublicKey}>Get Public Key</button><div>publicKey: {publicKey &&publicKey.toString('hex').slice(0,-4)}</div></>
}

export default GetPublicKey