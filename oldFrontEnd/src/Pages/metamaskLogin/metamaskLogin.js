import { useNavigate } from "react-router-dom";
import { HomeNav } from "../../component/Navbar/homeNav";
import metamaskIcon from '../../images/metamsak.png'
import {  useState } from "react";
import User from "../../SmartContracts/Users/Users";
import './metamaskLogin.css'
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";

export default function MetamaskLogin(props){
    const navigate=useNavigate();
    const [error , setError]=useState(false);
    const [errorMessage,SetErrorMessage]=useState("")
    let user=new User();
    const {  activate } = useWeb3React()

   
    const  enterPlatform=async ()=>{
        if(window.ethereum){
           await activate(new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42, 56, 97,1337] }))
              /*.then((res)=>{
                  navigate('/',{replace:true});
              });*/
              let isUser=await user.isUser();
              if(isUser ){
                navigate("/",{replace:true})
              }
              else{
                setError(true);
                SetErrorMessage("Click here"); 

              }


          /*await window.ethereum.request({ method: "eth_requestAccounts"} )
            .then((res)=>{
              if(res.length>0){
                user.isUser()
                  .then((res)=>{
                    if(!res){
                      setError(true);
                      SetErrorMessage("You are not subscribed into the platform"); 
                      }
                    else {
                      navigate('/',{replace:true});
                    }});

        }});*/
        }
        else{
          alert("INSTALL METAMASK");
          navigate("login");   
          }
    
  };

   



   
    return (
            <div>
              <HomeNav/>
              <div className="loginForm">
                <h2>Entra con Metamask</h2>
                <img className="metaIcon"src={metamaskIcon} alt=""></img>
                <div className="containerLogin">
                <button className="loginButton" onClick={enterPlatform}>Entra</button><br/>
                </div>
                { error && <p>It seems you are not subscribed into the platform:<br/><a className='error' href="/signin">{errorMessage}</a></p>}

              </div>
            </div>
    )
}
