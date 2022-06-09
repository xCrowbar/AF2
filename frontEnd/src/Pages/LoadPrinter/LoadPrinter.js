import {  useState } from 'react';
import OnBoarding from '../../SmartContracts/OnBoarding/OnBoarding';
import Select from 'react-select';
import './LoadPrinter.css';
import {  useNavigate } from 'react-router-dom';
import { MakerNav } from '../../component/Navbar/homeNav';
import { handleChange } from '../../Functions/handleChange';
import { getNozzles,getConstMaterials } from '../../data/data';

export default function LoadPrinter(){

    //const [error,setError]=useState(false)
    //const [errorMessage,SetErrorMessage]=useState('');
    const navigate=useNavigate();
    const [val,setVal]=useState({"soluble":true,"foodSaety":true,"material":[]});
    const [section,setSection]=useState(1);
    const material=getConstMaterials();
    const nozzles=getNozzles();
    let onBoarding=new OnBoarding();
    
    const handleSubmit= async(event)=>{
        event.preventDefault();
        let result=false;
        //console.log(printerData);
        if(result){
            return}
        else {
            let op=await onBoarding.addPrinter(val);
            if(op==="Error"){
                alert("Errore");
                window.location.reload();
            }
            else navigate('/');

        }
    }



    /*const checkError=async(printerData)=>{

        if(printerData['name'].match( /^[a-zA-Z0-9]+$/g)==null){
            setError(true);
            SetErrorMessage("The inserted character are not valid");
            return true;
        }
        else if(printerData['address'].length<10){
            setError(true);
            SetErrorMessage("Invalid address");   
            return true;
            //ALTRI CHECK SU ADDRESS PROVVISORIO
        }
        else return false;

    
    } */      


    return (

        <div>
            <div className='sign'>
            <MakerNav/>
            <h1>Add printer</h1>
            <div className='SignIn'>
            <form  onSubmit={handleSubmit}>
            
            <div className="sectionPage" style={{display:section===1?('block'):('none')}}>
                <label>
                    <p>Address</p>
                    <input type="text" className="addressData" name="address" onChange={(event) =>{ setVal((val)=>({...val,'address':event.target.value}));console.log(val)}} autoComplete="off" required minLength="4" maxLength="90"></input>
                </label><br/>

                <label>
                    <p>Name</p>
                    <input type="text" name="username" onChange={event =>setVal((val)=>({...val,'name':event.target.value}))  } autoComplete="off" required minLength="4" maxLength="10"></input>
                </label><br/>
                <label>
                <p>Material</p>
                    <div style={{
                        width:"70%",
                        margin:"auto"}}>
                   <Select  isMulti 
                    options={material}
                    getOptionValue={(option)=>option.value}
                    onChange={(option)=>{
                        let result=handleChange(option,'material');
                        console.log(result)
                        setVal((val)=>({...val,'material':result}));
                        
                    }}/>
                    </div>
                </label><br/>
                </div>

                <div className="sectionPage" style={{display:section===2?('block'):('none')}}>
                <label>
                <p>Nozzles</p>
                    <div style={{
                        width:"70%",
                        margin:"auto"}}>
                   <Select  isMulti 
                    options={nozzles}
                    getOptionValue={(option)=>option.value}
                    onChange={(option)=>{
                        let result=handleChange(option,'nozzles');
                        console.log(result);
                        setVal((val)=>({...val,'nozzles':result}));
                        
                    }}/>
                    </div>
                </label>
                <label>
                <p>Nozzles Mounted</p>
                    <div style={{
                        width:"70%",
                        margin:"auto"}}>
                   <Select  
                    options={nozzles}
                    getOptionValue={(option)=>option.value}
                    onChange={(option)=>{setVal((val)=>({...val,'nozzlesMount':option.value}))
                        
                    }}/>
                    </div>
                </label><br/>

                <label>
                <p>Max Print Temperature</p>
                <input type="number" id="tentacles" name="tentacles"
                    min="40" max="90" onChange={event => {setVal((val)=>({...val,'printerTemp':event.target.value}))
                    }}/>
                </label><br/>
                </div>

                <div className="sectionPage" style={{display:section===3?('block'):('none')}}>
                <label>
                <p> Max Bed Temperature</p>
                <input type="number" id="tentacles" name="tentacles"
                    min="20" max="40" onChange={event => {setVal((val)=>({...val,'bedTemp':event.target.value}))
                    }}/>
                </label><br/>

                <label>
                <p>Volume</p>
                <input type="number" id="tentacles" name="tentacles"
                    min="1" max="10" onChange={event => {setVal((val)=>({...val,'volume':event.target.value}))
                    }}/>

                </label><br/>

                <label>
                <p>soluble</p>
                    <select name="soluble" id="soluble" onClick={(e)=>setVal((val)=>({...val,'soluble':e.target.value}))}>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
                </label><br/>

                <label>
                <p>Food Safety</p>
                    <select name="food" id="food" onClick={(e)=>setVal((val)=>({...val,'foodSafety':e.target.value}))}>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </select>
                </label><br/>
                </div>
                
                <div className='elementInsertion'>
                {                   
                                    
                                    section>1
                                        &&
                                    
                <button className="next1" type='button' onClick={()=>setSection((prev)=>prev-1)}><p>&#60;</p></button>
                                       
                }
                {                       section!==3
                                            &&
                     <button className="next1" type='button' 
                        onClick={()=>setSection((prev)=>prev+1)}><p>&#62;</p></button>
                }

                {section===3 && <button className="next2" type='submit'>Aggiungi</button>}
                </div>


            </form>
            </div>

        </div>
        </div>


    )
}
//                { error && <p className='error'>{errorMessage}</p>}
