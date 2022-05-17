//import { Outlet } from 'react-router-dom';
import './Homepage.css';
//import { ethers } from "ethers";
import { HomeNav, MakerNav } from '../../component/Navbar/homeNav';
import { UserNav } from '../../component/Navbar/homeNav';
import {  useEffect, useState } from 'react';
import Design from '../design/design';
import User from '../../SmartContracts/Users/Users';
//import User from './SmartContracts/Users/Users';

function Homepage() {
  //let nav=null;
  const [loaded,setLoaded]=useState(false);
  const [nav,setNav]=useState();



  useEffect(()=>{
    const accountCheck=async()=>{
      let user=new User();
      const {ethereum}=window;
      await ethereum.request({ method: 'eth_accounts' })
        .then((res)=>{
          if(res.length>0){
            user.isUser()
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
        })};
    accountCheck();
  },[loaded])

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








