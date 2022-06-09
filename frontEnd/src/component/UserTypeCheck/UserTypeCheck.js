import { HomeNav,UserNav,MakerNav} from "../Navbar/homeNav";
import User from "../../SmartContracts/Users/Users";
import {useEffect} from 'react'
export default function UserTypeCheck(){
    const user=newUser();
    

    async function checkUser(){
        await user.isMaker
    }



    useEffect(()=>{



    })




}