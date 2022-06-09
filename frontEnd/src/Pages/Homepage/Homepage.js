//import { Outlet } from 'react-router-dom';
import './Homepage.css';
//import { ethers } from "ethers";
import { HomeNav, MakerNav } from '../../component/Navbar/homeNav';
import { UserNav } from '../../component/Navbar/homeNav';
import {  useEffect, useState } from 'react';
import Design from '../design/design';
import User from '../../SmartContracts/Users/Users';

function Homepage() {
  //let nav=null;
  const [loaded,setLoaded]=useState(false);
  const [nav,setNav]=useState();
  const [userType,setUserType]=useState('none')

  const accountCheck=async()=>{

    let user=new User();
    //await user.getUser();
    const {ethereum}=window;
    if(window.ethereum){
      const account=await ethereum.request({ method: 'eth_accounts' });
      if(account.length>0){
        
        let res=await user.isUser();
        if(res===true){

          let res=await user.isMaker();
          if(res===true){
            setLoaded(true);
            setUserType("Maker")
            setNav(<MakerNav/>);
          }
          else{
            setLoaded(true);
            setUserType("Caller")
            setNav(<UserNav/>);
          }
        }
        else{
          setLoaded(true);
          setNav(<HomeNav/>);
          }

        }
      else{
        setLoaded(true);
        setNav(<HomeNav/>);

      }
  }
  else{
    setLoaded(true);
    setNav(<HomeNav/>);
  }
      
    
    
    /*.then((res)=>{
        if(res.length>0){
          user.isMaker()
            .then((res)=>{
              if(res){
                setLoaded(true);
                setNav(<UserNav/>);
              }
              else {
                setLoaded(true);
                setNav(<HomeNav/>);
              }
              })
            .catch(()=>{setLoaded(true)
            setNav(<HomeNav/>)})
        }
       else{
         setLoaded(true);
        setNav(<HomeNav/>);
      }
      })*/
};


  useEffect(()=>{
      accountCheck();


  },[loaded,userType])

  if(loaded){
  return (
    <div>
      {nav}
      <div className='login'>
      </div>
       <Design/>
    </div>
  );}
  else return (<span>Loading</span>)
}

export default Homepage;








