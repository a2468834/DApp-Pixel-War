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
        const connectedContract = new ethers.Contract(this.contract_address,this.abi,this.signer)
        
        let message = 'Draw success'

        try {
            await connectedContract.draw(index, color)
        } catch ({error}) {
            message=error.message.split('reverted: ')[1]
        }
        return message
    }

    async getCanvas(){
        const connectedContract = new ethers.Contract(this.contract_address,this.abi,this.provider)
        const result = await connectedContract.getCanvas()
        return result
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

// module.e SmartContract