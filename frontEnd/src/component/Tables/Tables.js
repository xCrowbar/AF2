import { useEffect,useState } from "react";
import Web3 from "web3";
import OnBoarding from "../../SmartContracts/OnBoarding/OnBoarding";
import { useNavigate } from "react-router-dom";
import { getConstMaterials,getColor } from "../../data/data";
export default function Tables(props){

    const [printerList,setPr]=useState('');
    const [materialsList,setMaterialsList]=useState('');
    const navigate=useNavigate();
    let result='';

    const removePrinter=(async(index)=>{
        const onboard=new OnBoarding();
        let res=await onboard.removePrinter(index);
        if(res!=='Error')
            window.location.reload();
    })

    const removeMaterial=(async(name,type,index)=>{
        console.log(name,type,index)
        const onboard=new OnBoarding();
        let res=await onboard.removeMaterial(name,type,index);
        if(res!=='Error')
            window.location.reload();
    })


    useEffect(()=>{
        
        async function getData(){
            const web3=new Web3();
            if(props.table==='printer'){
                let boarding=new OnBoarding();
                let res =await boarding.getPrinters();
                console.log(res)
                console.log("qui")
                result=res.map((value,key)=>{
                        return <tr key={key} className="printers" >
                            <td key={value.name+"name"} className="color" onClick={()=>navigate('/myprinters/'+web3.utils.toUtf8(value.name)+'&&'+key)}> {web3.utils.toUtf8(value.name)} </td>
                            <td key={value.volume+"volume"}  style={{width:"10px"}} >{value.volume}m<sup>3</sup></td>
                            <td key={value.maxPrintTemperature}  style={{width:"10px"}} >  {value.maxPrintTemperature}&#8451; </td>
                            <td key={key+"button"} style={{width:"10px"}}><button className="remove" onClick={()=>removePrinter(key)}>Rimuovi</button></td>
                        </tr>  
                })
                setPr(result);
        }
        else if(props.table==='material'){
            const boarding=new OnBoarding();
            await boarding.getMaterialsName();
            let res=await boarding.getMaterials();
            console.log(res);
            if(res==='Error')
                return
            const material=getConstMaterials();
            const color=getColor()
            result=res.map((value,key)=>{
                return <tr key={key} className="printers" >
                    <td key={value.name+"name"} className="color" onClick={()=>navigate('/')}> {web3.utils.toUtf8(value.name)} </td>
                    <td key={value.color+"color"}  style={{width:"10px"}} >{color[value.color]}</td>
                    <td key={value.mType}  style={{width:"10px"}} >  {material[value.mType]} </td>
                    <td key={key+"button"} style={{width:"10px"}}><button className="remove" onClick={()=>removeMaterial(value.name,value.mType,key)}>Rimuovi</button></td>
                </tr>  
        })
            setMaterialsList(result);
        }};
        getData();},[])

        return(
           <div className="printerTable">
           {props.table==='printer'?(<h1>My printers</h1>):(<h1>My materials</h1>)}
           
           <table className="myPrinters">
               <tbody>
                   {props.table==='printer'?(<tr>
                       <th>Name</th>
                       <th>Volume</th>
                       <th>Max printer temperature</th>
                       <th>Remove</th>
                   </tr>):(<tr>
                            <th>Name</th>
                            <th>Color</th>
                            <th>Quantity</th>
                            <th>Remove</th>
                        </tr>)}

                   {props.table==='printer'?(printerList):(materialsList)} 
               </tbody>

           </table>
           <div className="buttonArea">
                   <button className="AddprinterButton" onClick={()=>navigate('/add'+props.table)}>Aggiungi</button>
               </div>

           </div>
           
       
        )
}