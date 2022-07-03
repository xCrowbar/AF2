import { UserNav } from "../../component/Navbar/homeNav"
import { getPrinters } from "../../data/data"
import './Myprinters.css'
import { useNavigate } from "react-router-dom";
import { useEffect} from "react";

export default function MyPrinters(){

    const printers=getPrinters();
    const navigate=useNavigate();
    useEffect(()=>{
        },[])
    
    return(
        <div>
             <UserNav/>
            <div className="printerTable">
            <h1>My printers</h1>
                <table className="myPrinters">
                    <tbody>
                    <tr>
                        <th>Address</th>
                        <th>Name</th>
                        <th>Seleziona</th>
                    </tr> 
                    {printers.printers.map((val,key)=>
                    <tr key={key}>
                        <td key={val.address}>{val.address}</td>
                        <td key={val.name}>{val.name}</td>
                        <td key={"button"+val.name}><button key={"button"+val.address} onClick={async ()=>navigate('/myprinters/'+val.address)}className="printerButton">Seleziona</button></td>
                    </tr>)}
                   </tbody> 
                </table>
            </div>
            
        </div>
    )
}