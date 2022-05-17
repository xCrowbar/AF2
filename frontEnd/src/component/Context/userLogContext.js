/*import React, { useEffect,useState } from "react";

const UserContextProvider=({children})=>{
   const [account, setAccount] = useState();
   const [loaded, setLoaded] = useState(true)
 

    async function checkAccount(){
        if (window.ethereum) {
            const accounts= await window.ethereum.request({ method: 'eth_accounts' });
            console.log(account)
            return accounts[0];

           
        }
    }
    async function result (){
        checkAccount();
        //console.log(account)

    } 

    useEffect(()=>{
        setAccount(checkAccount());

     },[])
    /*if(!loaded)
        return (children)
    else return navigate('login')
    return (children )

}

export default UserContextProvider;*/