import { MakerNav } from "../../component/Navbar/homeNav"
import './Myprinters.css';
import Tables from "../../component/Tables/Tables";
export default function MyPrinters(){
       
    return(
        <div>
             <MakerNav/>
            <div className="printerTable">
            
            
           <Tables table='printer'/>
 

            </div>
            
        </div>
    )
}








/*

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




*/