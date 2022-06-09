/*import React from 'react'
import { UserNav } from '../../component/Navbar/homeNav'
import { useEffect } from 'react';
import OnBoarding from '../../SmartContracts/OnBoarding/OnBoarding';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Web3 from "web3"

export default function MyMaterials() {

  const [materialsList,SetMaterialsList]=useState([])
  const navigate = useNavigate();
  const [action,SetAction] = useState("");

  const material=[
    {value:"0" , label:"ABS"},
    {value:"1",label:"PLA"},
    {value:"2",label:"PETG"}]  
    
  const colors=[
    {value:"0", label:"NONE"},
    {value:"1", label:"BLACK"},
    {value:"2", label:"WHITE"},
    {value:"3", label:"BROWN"},
    {value:"4",label:"GRAY"},
    {value:"5", label:"YELLOW"},
    {value:"6", label:"ORANGE"},
    {value:"7", label:"RED"},
    {value:"8", label:"PINK"},
    {value:"9", label:"PURPLE"},
    {value:"10", label:"BLU"},
    {value:"11", label:"GREEN"}]


  let result="prova"


  const handleSubmit = async(name,type,index)=>{
    const onboarding = new OnBoarding();
    await onboarding.removeMaterial(name, type, index)
    window.location.reload()
  }

  useEffect(()=>{
    async function getMaterials(){
      const onboarding = new OnBoarding();
      await onboarding.getMaterialsName();
      const web3 = new Web3()
      var mats = await onboarding.getMaterials();
      console.log(mats)

      const materia = [
        "ABS", "PLA", "PETG"
      ]
       result = mats.map((value,key)=>{

        return(<tr key={key}>
                <td key={value.name}>{web3.utils.toUtf8(value.name)}</td>
                <td key={value.mType+"material"}>{materia[value.mType]}</td>
                <td key={value.color+"color"}>{value.color}</td>
                <td key={value.quantityKG}>{value.quantityKG}</td>
                <td key={value.printTemperature+"Printer"}>{value.printTemperature}</td>
                <td key={value.bedTemperature+"Bed"}>{value.bedTemperature}</td>
                <td><button className='next1' onClick={()=>handleSubmit(value.name,value.mType,key)}>Remove</button></td>
                <td><button className='next1' onChange={SetAction("Update")}  onClick={()=>navigate('/addMaterial/'+key)} >Update</button></td>

        </tr>)
  
      })
      console.log(result)
      SetMaterialsList(result)
    }
    getMaterials();
  },[])

  return (
    <div>
        <div className='sign'>
        <UserNav/>
        <h1>My Materials</h1>
        
        <table className='myPrinters'>

          <tbody>
            <tr>
              <th>name</th>
              <th>Type</th>
              <th>Color</th>
              <th>quantityKG</th>
              <th>Print Temp</th>
              <th>Bed Temp</th>
              <th>Remove</th>
              <th>Update</th>
            </tr>
            {materialsList}
          </tbody>
        </table>
        <div className='SignIn'>
        <button className='next1' onClick={()=>navigate('/addMaterial')}>Add Materials</button>
        </div>
        </div>

    </div>
  )
}
*/


import Tables from "../../component/Tables/Tables";
import { MakerNav } from "../../component/Navbar/homeNav";


export default function Mymaterials(){

  return(
    <div>
         <MakerNav/>
        <div className="printerTable">
            <Tables table="material"/>

        </div>
        
    </div>
    )
  }