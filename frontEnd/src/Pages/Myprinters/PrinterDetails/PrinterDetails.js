import { getPrinter } from "../../../data/data";
import { useParams } from "react-router-dom";
import { UserNav } from "../../../component/Navbar/homeNav";
import './PrinterDetails.css'


export default function PrinterDetails(){

    let param = useParams();
    let address=""
    
    let printer=getPrinter(param.printerDetails);
    if(printer.address==="0x9b8bb1E03e2d5D0dD7cE536A975730903177B37f")
        address="192.168.8.240"
    else address="192.168.8.230"

    return (
        <div>
        <UserNav/>
        <h1 className="printerName">{printer.name}</h1>
        <div className="myPrinter">
        <div className="printerVideo">
        </div>





            <div className="info">
            <iframe className="video"src={"http://"+address+"/webcam/?action=stream"}
            width="450px"
            height="450px"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            title="Printer stream"></iframe>
            <div class="dataInfo">
                <h3>Address:</h3><p>{printer.address}</p>
                <h3>Nozzles mounted:</h3><p>{printer.nozzlesMounted}</p>
                <h3>Soluble:</h3><p>{printer.soluble}</p>
                <h3>Food safety:</h3><p>{printer.foodSafety}</p>
            </div>
            </div>            
        </div>
        </div>
    )   
}

