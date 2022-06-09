import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector';
import { useState,useEffect } from 'react';
import {Navigate} from "react-router-dom";
import User from '../../SmartContracts/Users/Users';

export const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42, 56, 97 , 1337] });

 export default function WalletConnected({ children }){
  const { active: networkActive, error: networkError, activate: activateNetwork } = useWeb3React();
  const [loaded, setLoaded] = useState(false);
  const [wait,setWait]=useState(false)
  const [isuser,setIsUser]=useState(false)


  const finish=()=>{
    setWait(true);
  }

  useEffect(() => {

    const player=async()=>{
      const user=new User();
      await user.isUser()
        .then((res)=>setIsUser(res));
  
    }

    if(networkActive)
      player();
    injected
      .isAuthorized()
      .then((isAuthorized) => {
        setLoaded(true)
        if (isAuthorized && !networkActive && !networkError) {
          activateNetwork(injected);
        }
      })
      .catch(() => {
        setLoaded(true)

      });
      setTimeout(()=>finish(),400);
    }, [activateNetwork, networkActive, networkError])
  
  
  if(loaded && wait){
    if(networkActive===true){
      if(isuser===true)
        return children;
      else return <Navigate to='/login'/>;
      }
    else if(!networkActive) {
      return <Navigate to='/login'/>
    }
  }

    else 
      return <span>Loading</span>

  
  

}


//Versione scarsa
  /*useEffect(()=>{
    const accountCheck=async()=>{
      let user=new User();
      
      const {ethereum}=window;
      account =await ethereum.request({ method: 'eth_accounts' })
        .then((res)=>{
          if(res.length>0){
            
            
            setLoaded(true)
            setNetwork(true)
          }
              
                else {
                  setLoaded(true);
                }
                })
              .catch(()=>{setLoaded(true)})

          };
    accountCheck();
  },[loaded])
  
        if(loaded && network){
    console.log("ok");
    return (children);}
  else if(loaded && !network){
    console.log("no ok");
   return  <Navigate to="/login"></Navigate>
  }
  else return (<span>Loading</span>)
  */