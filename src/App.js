import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';
import contract from '@truffle/contract';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function App() {

  const [contractInstance, setContractInstance] = useState();
  const [msg, setMsg] = useState();

  useEffect(() => {

    const init = async () => {
      const TestContractArtifact = require('./contracts/TestContract.json');
      const provider = new Web3.providers.HttpProvider('https://rpc-mumbai.maticvigil.com');
      const TestContract = contract(TestContractArtifact);
      TestContract.setProvider(provider);
      
      const instance = await TestContract.deployed();
      const result = await instance.message();
      setContractInstance(instance);
      setMsg(result);
    }
    init();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {msg}
        </p>
        <a href='/login' class='button'>Log In</a>
      </header>
    </div>
  );
}

export default App;
