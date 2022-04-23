import './App.css';
import { TwitterPicker } from 'react-color'
import { useState,useEffect } from 'react';
import SmartContract from './utils/contract.js';


const CANVAS_SIZE = 15

function App() {
  const [account, setAccount] = useState()
  const [selectedColor, setSelectedColor] = useState('#22194d')
  const [coordinate, setCoordinate] = useState([0,0])
  const [canvas,setCanvas] = useState([])
  const [smartContract,setSmartContract] = useState()

  useEffect(()=>{
    let arr = Array.from(Array(CANVAS_SIZE), row => Array.from(Array(CANVAS_SIZE), cell => '#fff'));
    setCanvas(arr)
    checkIfConnect()
  },[])

  useEffect(()=>{
    if(account){
      const {ethereum} =window
      let smart_contract = new SmartContract(ethereum)
      setSmartContract(smart_contract)
    }

  },[account])

  useEffect(()=>{
    let arr = Array.from(Array(CANVAS_SIZE), row => Array.from(Array(CANVAS_SIZE), cell => '#fff'));
    if(smartContract){
      /** ======== TODO 2 ======== */
    }
  },[smartContract])

  

  function connect2Wallet(){
    /** ======== TODO 1 ======== */
  }

  async function checkIfConnect(){
    /** ======== TODO 1-1 ======== */

}

  async function handleDraw(row,col){
    
    const color = selectedColor.replace('#','0x')
    const index = row*CANVAS_SIZE + col
    
    if(!smartContract){
      alert("Please connect to wallet first")
    }
    /** ======= TODO 3 ======== */
    
    
  }


  return (
    <div  className="frame">
      <button onClick={connect2Wallet} 
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"> 
          {account?('Connected'):('Connect Wallet')} 
      </button>
      <p>Address: {account}</p>
      <div className="panel flex items-center justify-center mt-10">
      <TwitterPicker color={selectedColor} onChange={(color)=>{setSelectedColor(color.hex)}}/>
      
      <p> Coordinate {`${coordinate[0]},${coordinate[1]}`} </p>
    </div>
    <div className="flex items-center center">
      {/* <p>{JSON.stringify(canvas)}</p> */}
    <table>
      {
        canvas.length?(
          canvas.map((_,row)=>{
            return (
              <tr>
                {canvas[row].map((_,col)=>{
                  return(
                    <td className="border" style={{height:'50px', width:'50px'}}>
                      <div 
                        onClick={()=>handleDraw(row,col)}
                        onMouseEnter={()=>setCoordinate([row,col])} 
                        style={{height:'100%', width:'100%','cursor': 'pointer','backgroundColor':`${canvas[row][col]}`}}>
                      </div>
                    </td>
                  )
                })}
              </tr>
            )
          })
        ):(null)
      }
    </table>
    </div>
    </div>

  );
}

export default App;
