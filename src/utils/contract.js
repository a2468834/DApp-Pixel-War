import { ethers } from "ethers";
import CANVAS from '../bin/canvas.json'


export default class SmartContract{
    constructor(ethereum) {
        this.contract_address = '0x41F32E231B6677A6A276049bcca8ebFb8b801a8F'
        this.provider =  new ethers.providers.Web3Provider(ethereum)
        this.signer = this.provider.getSigner()
        this.abi = CANVAS.abi
    }
    async draw(index, color){
        let message = 'Draw success'
        /** ======= TODO 3-1 ======== */


        return message
    }

    async getCanvas(){
       /** TODO 2-1 */
    }

    async _checkDrawEvent(index,color){
        const connectedContract = new ethers.Contract(this.contract_address,this.abi,this.provider)
        connectedContract.on("Draw",(address,_index,_color)=>{
            if(_index == index && _color == color) {
                console.log("Got the event")
                console.log(address,_index,_color)
                return true
            } 
        })
    }
}

