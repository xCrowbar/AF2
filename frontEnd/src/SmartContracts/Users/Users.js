import Web3Istance from "../Web3";
import UserABI from '../../ABIs/User.json'

export default class User extends Web3Istance{
    constructor(){
        super();
        let ABIScheduling = UserABI.abi;
        let ContractNetworks = UserABI.networks;
        let contractAddress=ContractNetworks[Object.keys(ContractNetworks)[Object.keys(ContractNetworks).length - 1]].address;
        this.contract=new this.web3.eth.Contract(ABIScheduling,contractAddress);
        //console.log(`Indirizzo Contratto ----- `+ contractAddress);  
        }
    

        async addCaller(position,username,begin,end){
            if(begin!==undefined && end!==undefined){
                console.log("Maker");
                let account=await this.checkIfWalletIsConnected();
                let res=await this.contract.methods.addMaker(this.utils.fromAscii(JSON.stringify(position)),this.utils.fromAscii(username),parseInt(begin),parseInt(end))
                    .send({from:account,gas:4600000}).then((res)=>{
                        if(res)
                            return true;
                        else return false;
                    });
                return res;
            }
            else{
                console.log("User");
                let account=await this.checkIfWalletIsConnected();
                let res=await this.contract.methods.addCaller(this.utils.fromAscii(JSON.stringify(position)),this.utils.fromAscii(username))
                    .send({from:account,gas:4600000}).then((res)=>{
                        if(res)
                            return true;
                        else return false;
                    });
                return res;
            }
        }

        async isUser(){
            let account = await this.checkIfWalletIsConnected();
            console.log(account);
            let res=await this.contract.methods.isPlayer(account).call()
            console.log(res)
            return res;

        }

        async getUser(){
           // await this.checkIfWalletIsConnected();
            let res= await this.contract.methods.getPlayerInfo().call();
            console.log(res);
            return res;
        }


}