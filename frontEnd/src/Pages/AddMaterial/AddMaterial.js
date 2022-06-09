import Select from 'react-select';
import { MakerNav } from '../../component/Navbar/homeNav'; 
import { useState } from 'react';
import OnBoarding from '../../SmartContracts/OnBoarding/OnBoarding';
import { useNavigate,useParams } from 'react-router-dom';
import { getColor,getConstMaterials } from '../../data/data';
import { useEffect } from 'react';


export default function AddMaterial(props){
    const navigate=useNavigate();
    const [val,setVal]=useState({});
    const material=getConstMaterials();
    const color=getColor();
    const [section,setSection]=useState(1);
    //const params=useParams();
    const [materialUpdate,setMaterialUpdate]=useState();
    const onboard=new OnBoarding();


    const handleSubmit=async(event)=>{
        event.preventDefault();
        let result=false;
        let op=await onboard.addMaterials(val);
        if(op==="Error"){
            alert("Errore");
            window.location.reload();
            }
            else navigate('/');
    }

    useEffect(()=>{

        /*const getMaterial=(async()=>{
            if(props.type==="update"){
                let res=await onboard.getMaterials();
                setMaterialUpdate(res);
            }
        });*/
        //getMaterial();
    })



    
    return(
        <div className='sign'>
            <MakerNav/>
            <h1>Add Material</h1>
            <div className='SignIn'>
            <form  onSubmit={handleSubmit}>
            <div className="sectionPage" style={{display:section===1?('block'):('none')}}>

                   <label>
                            <p>Material Name</p>
                            <input type="text" style={{display:'inline'}} name="address" onChange={(event) =>{ setVal((val)=>({...val,'materialName':event.target.value}))}} autoComplete="off" required minLength="4" maxLength="6"></input>
                    </label>
                    <label>
                        <p>Material Print Temperature</p>
                        <input type="number" id="tentacles" name="tentacles" 
                            min="1" max="90" onChange={event => {setVal((val)=>({...val,'materialTemp':event.target.value}))}}/>
                    </label>
            

                <label>
                    <p>Material Bed Temperature</p>
                    <input type="number" id="tentacles" name="tentacles" 
                        min="1" max="90" onChange={event => {setVal((val)=>({...val,'materialBedTemp':event.target.value}))}}/>
                </label>
            </div>
            <div className="sectionPage" style={{display:section===2?('block'):('none')}}>

                <label>
                    <p>Quantity (Kg)</p>
                    <input type="number" id="tentacles" name="tentacles" 
                        min="1" max="10" onChange={event => {setVal((val)=>({...val,'materialQuantity':event.target.value}))}}/>
                </label>

                <label>
                    <p>Material Color</p>
                        <div style={{
                            width:"200px",
                            margin:"auto"
                            }}>
                    <Select  
                        options={color}
                        getOptionValue={(option)=>option.value}
                        onChange={(option)=>{
                            console.log(option.value);
                            setVal((val)=>({...val,'color':[option.value]}))
                            }}/>
                        </div>
                    </label>

                <label>
                    <p>Material</p>
                        <div style={{
                            width:"200px",
                            margin:"auto"
                            }}>
                    <Select   
                        options={material}
                        getOptionValue={(option)=>option.value}
                        onChange={(option)=>{
                            console.log(option.value);
                            setVal((val)=>({...val,'material':[option.value]}))
                            }}/>
                        </div>
                    </label>
   

                </div>
                <div className='elementInsertion'>
                {                   
                                    
                                    section>1
                                        &&
                                    
                <button className="next1" type='button' onClick={()=>setSection((prev)=>prev-1)}><p>&#60;</p></button>
                                       
                }
                {                       section!==2
                                            &&
                     <button className="next1" type='button' 
                        onClick={()=>setSection((prev)=>prev+1)}><p>&#62;</p></button>
                }

                {section===2 && <button className="next2" style={{padding:"10px"}}type='submit' onClick={handleSubmit}>Aggiungi</button>}
                </div>
            </form>
        </div>
    </div>
    )

}