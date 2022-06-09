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
                console.log("Chiamo",printerInfo);
                    await this.contract.methods.addPrinter(
                        printerInfo["address"],
                        this.utils.fromAscii(printerInfo["name"]),
                        printerInfo['material'],
                        printerInfo['nozzles'], 
                        parseInt(printerInfo["nozzlesMount"]),
                        parseInt(printerInfo["printerTemp"]),
                        parseInt(printerInfo["bedTemp"]),
                        parseInt(printerInfo["volume"]),
                        printerInfo["soluble"],
                        printerInfo["foodSafety"]).send({from:account,gas:4600000});

        }


    async getPrinters(){

        let account=await this.checkIfWalletIsConnected();
            let res=await this.contract.methods.getMakerPrinters().call({from:account});
            return res;
        }

    async getPrinter(index){
        let account=await this.checkIfWalletIsConnected();
        try{
            let res=await this.contract.methods.getMakerPrinter(parseInt(index)).call({from:account});
            return res;
        }
        catch(error){
            return "Error";
        }
    }


    async addMaterials(materialData){
        let account=await this.checkIfWalletIsConnected();
        console.log("name ",this.utils.asciiToHex(materialData["materialName"]),"material ",materialData['material'],
            "quantity ",parseInt(materialData["materialQuantity"]),"bedTemp ",parseInt(materialData["materialBedTemp"])
                );
        await this.contract.methods.addMaterials(
            this.utils.asciiToHex(materialData["materialName"]),
            materialData['material'],
            parseInt(materialData['color']), 
            parseInt(materialData["materialQuantity"]),
            parseInt(materialData["materialTemp"]),
            parseInt(materialData["materialBedTemp"])
                ).send({from:account,gas:4600000});

        }


    async removeMaterial(name,type){
        let account=await this.checkIfWalletIsConnected();
        await this.contract.methods.removeMaterial(
            name,
            type).send({from:account,gas:4600000});

    }



    async getMaterials(){
        let account=await this.checkIfWalletIsConnected();
            let res=await this.contract.methods.getMaterials().call({from:account});
            console.log(res);
            return res;

    }



    async removePrinter(index){
        let account=await this.checkIfWalletIsConnected();
        await this.contract.methods.removePrinter(parseInt(index)).send({from:account,gas:4600000});


    }

    async getMaterialsName(){
        let account=await this.checkIfWalletIsConnected();
        let res=await this.contract.methods.getMterialsName().call({from:account});
        res.forEach((val)=>console.log(this.utils.toUtf8(val)))

       
    }


}