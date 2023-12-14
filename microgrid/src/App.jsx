import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
//import './style.css'
import {ethers} from 'ethers'


function App() {
  const [count, setCount] = useState({
    owner: 'Thesis owner',
    name: 'Thesis project',
    balancex: 0

  })
  const [connected, setConnected]= useState(false);
  const [id, setid]= useState(null);

const Account_Balance= async()=>{
  const provider = new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/ce6709aebc684e78b02cb5db12598dd0");
  const ContractAddress="0x652a0C7765F909F7D3519B9E3C629ffE3113Fff8";
  const ContractABI=[
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_transactionIndex",
          "type": "uint256"
        }
      ],
      "name": "completeTransaction",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "receiver",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "name": "EnergyTransactionCompleted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "receiver",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "name": "EnergyTransactionInitiated",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_receiver",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "initiateTransaction",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_address",
          "type": "address"
        }
      ],
      "name": "accountBalance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getTransactionCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "transactions",
      "outputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "receiver",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "completed",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]

  if(!connected){
    const metaProvider = new ethers.BrowserProvider(window.ethereum);
    const signer= await metaProvider.getSigner();
    const metaAddress= await signer.getAddress();
    const displayaddress= metaAddress?.substr(0,8)+"..."
    const message=" Rashique Itquan"
    const sig= await signer.signMessage(message);
    ethers.verifyMessage(message,sig);
    setid(displayaddress);
    setConnected(true);
  }

  //const Meta_provider = new ethers.BrowserProvider(window.ethreum);
 // const signer = await Meta_provider.getSigner();
  
  const GridContract= new ethers.Contract(ContractAddress,ContractABI,provider);
  const contractOwner= await GridContract.owner();
  console.log(" Our contract owner is ",contractOwner );
  const contractName= await GridContract.name();
  console.log(" Our contract name is ",contractName );
  const balance= await GridContract.accountBalance("0xb2a77c0df0772Fa79AE90eAB8a9Bc69748AdB9aB");
  console.log(" My Wallet balance is ", ethers.formatEther(balance));

  setCount({

    owner: contractOwner,
    name: contractName,
    balancex: balance
             
  })

}

  return (
    <>
      <h1> Microgrid Control Panel</h1>
      <button className='btn1' onClick={Account_Balance}> {connected? id:"Account Balance"}</button>
      <button className='btn2'>Sell Energy</button>
      <button className='btn3'>Receive Energy</button>
      <p>{"The owner is "+count.owner}</p>
      <p>{"The name is "+count.name}</p>
      <p>{"The balance is "+count.balancex}</p>
       
    </>
  )
}

export default App
