import { getDesigne } from "../../data/data";
import { useParams } from "react-router-dom";
import { UserNav } from "../../component/Navbar/homeNav";
import './DesignInfo.css'
import { Stl } from "../../component/STLviewer/Stl";
export default function DesignInfo(){
    let param = useParams();
    
    let design=getDesigne(param.designInfo)
    console.log(design.fileNamename)

    const startPrint=async()=>{
    let address="";
    if (design.fileName==="Cube_3d.stl")
        address="http://192.168.8.230";
    else address="http://192.168.8.240";
        window.location = address;
        

        /*await fetch('IP_ADDRESS/printer/start',{
            method:'POST',
            body:{
                'design':''
            },
            headers:{
                'Content-Type': 'application/json'
            }
        });
        const result=await startPrint.json();
        return result;*/
    }



    function importAll(r,stlFileName) {
        let designes = {};
        r.keys().map((item, index) => { designes[item.replace('./', '')] = r(item); });       
        for(const [key,value] of Object.entries(designes)){
            console.log(key)
            if(key===stlFileName)
                return designes[key].default;
        }
    }
    const design_path=importAll(require.context('../../images/stlFiles/',false,/\.stl$/),design.fileName);
    
    return(
        <div>
            <UserNav/>
            <div className="stl_render">
                <h1>{design.name}</h1>
                <Stl design_path={design_path}/>
                <div className="designInfo">                    
                    <p>{design.info}</p>
                    <button className="printButton" onClick={startPrint}>Stampa</button>
                </div>
            </div>
        </div>
    )


}