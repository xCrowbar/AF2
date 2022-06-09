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
    

        async addCaller(username,position,begin,end){

            const pos="{"+position.latitude+','+position.longitude+'}';
            console.log(pos);
            if(begin!==undefined && end!==undefined){
                console.log("Maker");
                let account=await this.checkIfWalletIsConnected();
                try{
                    let res=await this.contract.methods.addMaker(this.utils.fromAscii(pos),this.utils.fromAscii(username),parseInt(begin),parseInt(end))
                        .send({from:account,gas:4600000}).then((res)=>{
                            if(res)
                                return true;
                            else return false;
                        });
                    return res;
                }
                catch(error){
                    return "Error";
                }
            }
            else{
                try{
                    console.log("User");
                    let account=await this.checkIfWalletIsConnected();
                    
                    let res=await this.contract.methods.addCaller(this.utils.fromAscii(pos),this.utils.fromAscii(username))
                        .send({from:account,gas:4600000});
                    return res;}
                catch(error) {return"Error";}
            }
        }

        async isUser(){
            let account = await this.checkIfWalletIsConnected();
            console.log(account);
            try{
                let res=await this.contract.methods.isPlayer(account).call()
                //console.log(res)
                return res;
            }catch(erorr){
                return "Error";
            }
        }

        async isMaker(){
            let account = await this.checkIfWalletIsConnected();
            try{
                let res=await this.contract.methods.isMaker(account).call({from:account})
                console.log("Maker",res)
                return res;
            }catch(erorr){
                return "Error";
            }

        }

        async getUser(){
           let account=await this.checkIfWalletIsConnected();
                let res=await this.contract.methods.getPlayerInfo().call({from:account});
                console.log(res);
                let result=[];
                res=res[0];
                res.forEach((value,key)=>{
                    if(key==='length')
                        return;
                     result.push(value)
                })
                console.log(result);
        

                return res;

        }


    }