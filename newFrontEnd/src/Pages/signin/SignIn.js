import {  useState } from 'react';
import User from '../../SmartContracts/Users/Users' 
import { HomeNav } from '../../component/Navbar/homeNav';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';


export default function SignIn(){

    const [error,setError]=useState(false)
    const [errorMessage,SetErrorMessage]=useState('');
    const [username,setUsername]=useState('');
    const [checked,setChecked]=useState(false);
    const [begin,setBegin]=useState();
    const [end,setEnd]=useState()
    let user=new User();
    let navigate=useNavigate();
    const maker=
        <div className='makerTime'>
            <div className='info'>
            <p>Specifica gli orari disponibili per la stampa (almeno 3 ore); richiederemo anche la tua posizione</p>
            </div>
            <label htmlFor="appt"><p>Inzio</p></label>
            <br/>
            <input className="makerTimeInput" onChange={(event)=>setBegin(event.target.value)} type="time" id="appt" name="appt"min="09:00" max="18:00" required/>
            <br/>
            <label htmlFor="appt"><p>Fine</p></label>
            <br/>
            <input className="makerTimeInput" onChange={(event)=>setEnd(()=>event.target.value)} type="time" id="appt" name="appt"min="09:00" max="18:00" required/>
        </div>




            /*if(window.ethereum){
                const accounts=await window.ethereum.request({ method: "eth_requestAccounts"} )
                if(accounts.length>0)
                    navigate('/')
                else
                    window.ethereum.request({ method: "eth_requestAccounts"} )*/

    const onlyHour= (e) => {
        let hour = e.target.value.split(':')[0]
        e.target.value = `${hour}:00`
      }
      
    const handleSubmit= async(event)=>{
        event.preventDefault();
        navigator.geolocation.getCurrentPosition((position)=> {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
            addCaller(position.coords.latitude,position.coords.longitude)
        });


    }

    const checkError=async(latitude,longitude)=>{
        
        if(begin>=end){
            SetErrorMessage("The begin time cannot be greater or equal than the end time");
            setError(true);
            return true;

        } 


        else if(latitude===undefined||longitude===undefined){
            SetErrorMessage("You must provide your location for signing in");
            setError(true); 
            return true;
        }
        else if(username.match( /^[a-zA-Z0-9]+$/g)==null){
            setError(true);
            SetErrorMessage("The inserted character are not valid");
            return true;
        }

        else return ;
    }

    const addCaller=async (latitude,longitude)=>{
        await checkError(latitude,longitude);
        console.log(error)

        if (error)
            return;
        else{

            if(await user.isUser()){
                SetErrorMessage("You are altready subscribed");
                setError(true);
                return;
            }

            else{

                let result=await user.addCaller(username,{latitude:latitude,longitude:longitude},begin,end);
                if(result) 
                    navigate('/',{replace:true});
                
                else { 
                    alert("Error") 
                    window.location.reload();
                
                }  
            }
        }
            //console.log("errore");
    }       


    return (

        <div>
            <HomeNav/>
            <div className='sign'>
            <h1>Sign In</h1>
            <div className='SignIn'>
            <form  onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input type="text" name="username" onChange={event => setUsername(event.target.value)}autoComplete="off" required minLength="4" maxLength="10"></input>
                </label><br/>

                <div className='checkboxes'>
                <p><label>
                        <input className="check" type="checkbox" onChange={()=>setChecked(()=>!checked)}/>
                        Air Maker?
                    </label></p>
              { checked && maker}
            </div><br/>
                <button className="SubmitButton" type='submit'>Sign in</button>



            </form>
                { error && <p className='error'>{errorMessage}</p>}
            </div>

        </div>
        </div>


    )
}
