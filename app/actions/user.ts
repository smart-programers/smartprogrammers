"use server"

import { cookies } from "next/headers"
import { Cookie } from "../hooks/cookie";
import { verifyJwtToken } from "./auth";


export async function getUser(){
    const CookieStore = cookies();
   const token = CookieStore.get(Cookie);

   if(!token){
    return {success:false}
   }
    try{
 const user =await verifyJwtToken(token.value);

 return { success:true,user:user}
    }catch(error){
        console.log(token)
 return {success:false,error:error}
    }

}