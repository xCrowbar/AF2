import { useParams } from "react-router-dom";
import { MakerNav } from "../../../component/Navbar/homeNav";
import {useEffect,useState} from 'react';
import './PrinterDetails.css';
import OnBoarding from "../../../SmartContracts/OnBoarding/OnBoarding";
import {InfoComponent,AddComponent} from "../../../component/PrinterInfoComponent/InfoComponent";

export default function PrinterDetails(){

    let param = useParams();
    console.log(param);
    let reg=/&&([0-9])/g;
    const [loaded,setLoaded]=useState(false);
    const index=reg.exec(param.printerDetails);
    console.log(index);
    const [myPrinter,setMyPrinter]=useState();
    const title=['Printer Info','Modify Printer'];
    const [currentTitle,setCurrentTitle]=useState(title[0]);
    const target={        
        info:false,
        modify:false,
    }
    const [section,setSection]=useState({        
        info:true,
        modify:false,
    });
    
    //let printer=getPrinter(param.printerDetails);

    function setNewSection(currentSection){
        let result='';
        switch(currentSection){
            case 'info': result=Object.assign(target,{info:true});
                setSection(result);
                setCurrentTitle(title[0]); 
                break;
            case 'Modify': result=Object.assign(target,{modify:true});
                setSection(result);
                setCurrentTitle(title[1]);
                break;
            default: break;
        }


    }


    useEffect(()=>{

        const  getPrinterInfo=async()=>{
            const onboard=new OnBoarding();
            const result=await onboard.getPrinter(index[1]);
            setMyPrinter(result);
            setLoaded(true);
            
            

        };
        getPrinterInfo();
    },[])
    return (
        <div>
        <MakerNav/>
        <div className="title">
            <h2>{currentTitle}</h2>
        </div>
        
            <div className="navBarPrinter">
                    <p className="sectionStyle" style={{textDecoration:section.info? 'underline': '',
                        color: section.info? 'rgb(130, 195, 255)': ''}} onClick={()=>{
                        if(section.info!==true)
                            setNewSection('info');
                    }}>Info</p>
                    <p className="sectionStyle" style={{textDecoration:section.modify? 'underline': '',
                        color: section.modify? 'rgb(130, 195, 255)': ''}} onClick={()=>{
                        if(section.modify!==true)
                            setNewSection('Modify');
                    }}>Modify</p>
            </div>
            <div className ="container">
                <div className="video">
                    <iframe className="video"src={"http://192.168.1.172/webcam/?action=stream"}
                        width="450px"
                        height="400px"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        title="Printer stream">
                    </iframe>
                </div>
                {section.info && loaded===true && <InfoComponent printer={myPrinter}/>}
                {section.modify && <AddComponent/>}

        </div>
          
        </div>
    )   
}


/*
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
*/