import Web3 from "web3";

export default class Web3Istance{
    constructor(){
        this.web3="";
        this.setProvider=()=>{

                return new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
        }
        this.web3=this.setProvider();
        this.utils=this.web3.utils;
    }
    async checkIfWalletIsConnected(){
        if (window.ethereum) {
            const accounts = await window.ethereum.request({
              method: "eth_accounts",
            });
        
            if (accounts.length > 0) {
              const account = accounts[0];
              return(account);
            }
          }
        
    }
}