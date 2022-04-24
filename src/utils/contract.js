import { ethers } from "ethers";
import CANVAS from '../bin/canvas.json';

export default class SmartContract {
    constructor(ethereum) {
        this.address  = ""; // Deploy contract address
        this.provider = new ethers.providers.Web3Provider(ethereum);
        this.signer   = this.provider.getSigner();
        this.abi      = CANVAS.abi;
        this.contract = new ethers.Contract(this.address, this.abi, this.provider);
    }
    
    async draw(index, color) {
        const connectedContract = this.contract.connect(this.signer);
        
        try {
            const tx_response = await connectedContract.draw(index, color);
            const tx_receipt = await tx_response.wait();
            //console.log("tx_response", tx_response);
            //console.log("tx_receipt", tx_receipt);
            
            if((!tx_receipt) || (tx_receipt.status == false)) {
                return 'The transaction has been reverted!';
            }
            else {
                return 'Draw successfully';
            }
        }
        catch ({error}) {
            return error.message;
        }
    }
    
    async getCanvas() {
        const connectedContract = this.contract.connect(this.signer);
        return (await connectedContract.getCanvas());
    }
    
    async _checkDrawEvent(index,color) {
        const connectedContract = this.contract.connect(this.signer);
        
        connectedContract
            .on("Draw",(address,_index,_color) => {
                if(_index == index && _color == color) {
                    console.log("Got the event");
                    console.log(address, _index, _color);
                    return true;
                } 
            });
    }
}