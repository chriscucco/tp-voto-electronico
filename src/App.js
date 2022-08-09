import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';
import contract from '@truffle/contract';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie'
import { processTokenDecrypt } from './auth/auth';


function App() {

  const [contractInstance, setContractInstance] = useState();
  const [msg, setMsg] = useState();

  useEffect(() => {

    const init = async () => {
      const TestContractArtifact = require('./contracts/TestContract.json');
      const provider = new Web3.providers.HttpProvider('https://rpc-mumbai.maticvigil.com');
      const TestContract = contract(TestContractArtifact);
      TestContract.setProvider(provider);

      const encryptedData = Cookies.get('bv_aT')
      const iv = Cookies.get('bv_Iv')
      if (encryptedData && iv){
        console.log(encryptedData)
        console.log(iv)
        const data = processTokenDecrypt(encryptedData, iv)
        console.log("///////////////////")
        console.log(data)
        console.log("///////////////////")
      }
      
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
        <a href='/login' class='button'>Ingresar</a>
        <a href='/users' class='button'>Crear cuenta</a>
      </header>
    </div>
  );
}

export default App;
