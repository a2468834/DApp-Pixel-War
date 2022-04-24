import './App.css';
import { TwitterPicker } from 'react-color';
import { useState,useEffect } from 'react';
import SmartContract from './utils/contract.js';


// Constants
const CANVAS_SIZE = 15;
const init2DArray = (dim1, dim2, fill_value) => {
    return Array(dim1).fill(null).map(() => Array(dim2).fill(null).map(() => String(fill_value)));
};

function App() {
    const [account, setAccount]             = useState();
    const [selectedColor, setSelectedColor] = useState('#22194d');
    const [coordinate, setCoordinate]       = useState([0, 0]);
    const [canvas,setCanvas]                = useState([]);
    const [smartContract,setSmartContract]  = useState();
    
    useEffect(() => {
        let arr = init2DArray(CANVAS_SIZE, CANVAS_SIZE, "#fff");
        setCanvas(arr);
        checkIfConnect();
    }, []);
    
    useEffect(() => {
        if(account) {
            const {ethereum} = window;
            let smart_contract = new SmartContract(ethereum);
            setSmartContract(smart_contract);
        }
    }, [account]);

    useEffect(() => {
        let arr = init2DArray(CANVAS_SIZE, CANVAS_SIZE, "#fff");
        
        if(smartContract) {
            smartContract.getCanvas()
                .then(result => {
                    console.log("result", result);
                    
                    for(let i = 0; i < result.length; i++) {
                        const _row = Math.floor(i / CANVAS_SIZE);
                        const _col = i % CANVAS_SIZE;
                        
                        if(result[i] !== '0x000000') 
                            arr[_row][_col] = result[i].replace('0x','#');
                    }
                    
                    setCanvas(arr);
                });
        }
    }, [smartContract]);
    
    async function checkIfConnect() {
        const {ethereum} = window;
        const accounts = await ethereum.request({method: 'eth_accounts'});
        
        if(accounts.length > 0) {
            setAccount(accounts[0]);
        }
    }
    
    function connect2Wallet() {
        const {ethereum} = window;
        
        if(ethereum) {
            console.log("Connected successfully");
            
            ethereum.request({method: 'eth_requestAccounts'})
                .then(result=>{
                    setAccount(result[0]);
                });
        }
        else {
            alert("Please install MetaMask");
        }
    }

    async function handleDraw(row,col){
        const color = selectedColor.replace('#','0x');
        const index = row * CANVAS_SIZE + col;
        
        if(!smartContract) {
            alert("Please connect to the crypto wallet.");
        }
        
        const result = await smartContract.draw(index, color);
        
        if(result == 'Draw successfully') {
            const _canvas = canvas;
            _canvas[row][col] = selectedColor;
            setCanvas(_canvas);
        }
        
        alert(result);
    }
    
    return (
        <div className="frame">
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
                        canvas.length ? (
                            canvas.map((_,row)=>{
                                return (
                                    <tr>
                                        {
                                            canvas[row].map((_,col) => {
                                                return (
                                                    <td className="border" style = {{height:'50px', width:'50px'}}>
                                                        <div
                                                            onClick = {() => handleDraw(row, col)}
                                                            onMouseEnter = {() => setCoordinate([row, col])}
                                                            style = {{height:'100%', width:'100%','cursor': 'pointer','backgroundColor':`${canvas[row][col]}`}}>
                                                        </div>
                                                    </td>
                                                )
                                            })
                                        }
                                    </tr>
                                )
                            })
                        ) : (null)
                    }
                </table>
            </div>
        </div>
    );
}

export default App;