import { useWeb3React } from "@web3-react/core";
import { useEffect } from "react";
import { InjectedConnector } from "@web3-react/injected-connector";

export default function Test(){
    const { chainId, account, activate, active } = useWeb3React()

    const onClick=(()=>{
     activate(new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42, 56, 97,1337] }))
    })
    useEffect(() => {
  
      },[account,active]);
  
    return (
        <div>
          <div>ChainId: {chainId}</div>
          <div>Account: {account}</div>
          {active ? (
            <div> </div>
          ) : (
            <button type="button" onClick={onClick}>
              Connect 
            </button>)}
            
          </div>
    );
  }
