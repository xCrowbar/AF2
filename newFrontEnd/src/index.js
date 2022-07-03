import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Web3ReactProvider } from '@web3-react/core';
import { ethers } from 'ethers';
//import Test from './Test';
//import StlLoad from './Pages/StlLoad/StlLoad';
//import LoadPrinter from './Pages/LoadPrinter/LoadPrinter';



function getLibrary() {
  const library =new ethers.providers.Web3Provider(window.ethereum,"any");// this will vary according to whether you use e.g. ethers or web3.js
  library.pollingInterval = 150000
  return library;
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Web3ReactProvider getLibrary={getLibrary} >
  <App/>
  </Web3ReactProvider>



 /* <BrowserRouter>
  <Routes>
    <Route path="/" element={<App/>}></Route>
    <Route path="/login" element={<MetamaskLogin/>}></Route>
    <Route path="/signin" element={<SignIn/>}></Route>
    <AccountCheck>
    <Route path="myprinters"element={<MyPrinters/>}></Route>
      <Route path='myprinters/:printerDetails' element={<PrinterDetails/>}/>
    <Route path="mydesignes" element={<MyDesignes/>}></Route>
      <Route path="mydesignes/:designInfo" element={<DesignInfo/>}>
    </Route>
    </AccountCheck>
  </Routes>
  </BrowserRouter>*/
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
