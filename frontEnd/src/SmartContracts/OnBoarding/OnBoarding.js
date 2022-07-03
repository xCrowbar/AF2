import Web3Istance from "../Web3";
import OnBoardingABI from '../../ABIs/OnBoarding.json'

export default class OnBoarding extends Web3Istance{
    constructor(){
        super();
        let ABIScheduling = OnBoardingABI.abi;
        let ContractNetworks = OnBoardingABI.networks;
        let contractAddress=ContractNetworks[Object.keys(ContractNetworks)[Object.keys(ContractNetworks).length - 1]].address;
        this.contract=new this.web3.eth.Contract(ABIScheduling,contractAddress);
        //console.log(`Indirizzo Contratto ----- `+ contractAddress);  
        }
    
//address,name,materialSupported,nozzles,mountedNozzles,printTemp,bedTemp,volume,soluble,foodSafety
        async addPrinter(printerInfo){
            let account=await this.checkIfWalletIsConnected();
            console.log("qua")
            console.log(printerInfo["address"]);
            await this.contract.methods.addPrinter(
                printerInfo["address"],
                this.utils.fromAscii(printerInfo["name"]),
                printerInfo['material'],
                [0,1,2], 
                parseInt(printerInfo["nozzlesMount"]),
                parseInt(printerInfo["printerTemp"]),
                parseInt(printerInfo["bedTemp"]),
                parseInt(printerInfo["volume"]),
                printerInfo["soluble"],
                printerInfo["foodSafety"]).send({from:account,gas:4600000}) 
        }


}