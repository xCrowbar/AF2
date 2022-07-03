import {  useState } from 'react';
import OnBoarding from '../../SmartContracts/OnBoarding/OnBoarding';
import { HomeNav } from '../../component/Navbar/homeNav';
import Select from 'react-select';
import './LoadPrinter.css';


export default function LoadPrinter(){

    const [error,setError]=useState(false)
    const [errorMessage,SetErrorMessage]=useState('');
    let  printerData={"soluble":true,"foodSaety":true,"material":[]};
    const [section,setSection]=useState(1);
    const material=[
        {value:"0" , label:"ABS"},
        {value:"1",label:"PLA"},
        {value:"2",label:"PETG"}]
    let onBoarding=new OnBoarding();


            /*if(window.ethereum){
                const accounts=await window.ethereum.request({ method: "eth_requestAccounts"} )
                if(accounts.length>0)
                    navigate('/')
                else
                    window.ethereum.request({ method: "eth_requestAccounts"} )*/

    const handleChange=(option)=>{
        let values=[]
        option.map((value)=>{
            values.push(parseInt(value.value));
            
        })
        printerData['material']=values;
        if(values.length===0)
            printerData['material']=undefined;
        console.log(printerData['material']);
        

    }


    const handleSubmit= async(event)=>{
        event.preventDefault();
        let result=checkError(printerData);
        if(result){
            console.log("webekbj")
            return}
        else {
            console.log("webekbj")
            await onBoarding.addPrinter(printerData);
        }

    }

    const checkError=async(printerData)=>{

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

    
    }       


    return (

        <div>
            <div className='sign'>
            <HomeNav/>
            <h1>Add printer</h1>
            <div className='SignIn'>
            <form  onSubmit={handleSubmit}>
            
            <div className="sectionPage" style={{display:section===1?('block'):('none')}}>
                <label>
                    <p>Address</p>
                    <input type="text" name="address" onChange={event => printerData["address"]=event.target.value} autoComplete="off" required minLength="4" maxLength="90"></input>
                </label><br/>

                <label>
                    <p>Name</p>
                    <input type="text" name="username" onChange={event => printerData["name"]=event.target.value} autoComplete="off" required minLength="4" maxLength="10"></input>
                </label><br/>
                <label>
                <p>Material</p>
                    <div style={{
                        width:"200px",
                        margin:"auto"}}>
                   <Select  isMulti 
                    options={material}
                    getOptionValue={(option)=>option.value}
                    onChange={(option)=>{handleChange(option)
                    console.log(option)}}/>
                    </div>
                </label><br/>
                </div>

                <div className="sectionPage" style={{display:section===2?('block'):('none')}}>
                <label>
                <p>Nozzles</p>
                <input type="number" id="tentacles" name="tentacles"
                    min="1" max="10" onChange={event => {printerData["nozzles"]=event.target.value
                        }}/>
                

                </label><br/>
                <label>
                <p>Nozzles mounted</p>
                    <input type="number" id="tentacles" name="tentacles"
                        min="1" max="10" onChange={event => {printerData["nozzlesMount"]=event.target.value
                        }}/> 

                </label><br/>

                <label>
                <p>Print Temperature</p>
                <input type="number" id="tentacles" name="tentacles"
                    min="1" max="10" onChange={event => {printerData["printerTemp"]=event.target.value
                    }}/>
                </label><br/>
                </div>

                <div className="sectionPage" style={{display:section===3?('block'):('none')}}>
                <label>
                <p>Bed Temperature</p>
                <input type="number" id="tentacles" name="tentacles"
                    min="1" max="10" onChange={event => {printerData["bedTemp"]=event.target.value
                    }}/>
                </label><br/>

                <label>
                <p>Volume</p>
                <input type="number" id="tentacles" name="tentacles"
                    min="1" max="10" onChange={event => {printerData["bedTemp"]=event.target.value
                    }}/>

                </label><br/>

                <label>
                <p>soluble</p>
                    <select name="soluble" id="soluble" onClick={(e)=>printerData["soluble"]=e.target.value}>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
                </label><br/>

                <label>
                <p>Food Safety</p>
                    <select name="food" id="food" onClick={(e)=>printerData["foodSafety"]=e.target.value}>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </select>
                </label><br/>
                </div>
                { error && <p className='error'>{errorMessage}</p>}
                
                <div className='elementInsertion'>
                {                   
                                    
                                    section>1
                                        &&
                                    
                <button className="next1" type='button' onClick={()=>setSection((prev)=>prev-1)}>Indietro</button>
                                       
                }
                {                       section!==3
                                            &&
                     <button className="next1" type='button'style={{marginLeft:section===1?('130px'):('auto')}} 
                        onClick={()=>setSection((prev)=>prev+1)}>Avanti</button>
                }

                {section===3 && <button className="next1" type='submit'>Aggiungi</button>}
                </div>


            </form>
            </div>

        </div>
        </div>


    )
}
