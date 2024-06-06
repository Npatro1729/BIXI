import Link from "next/link"
import { useEffect, useState } from "react";
import {signIn,useSession,signOut} from 'next-auth/react'
import {useRouter} from"next/router"



export function Appbar(){
    const router = useRouter();
   const {status,data} = useSession();


   
   if(status === "unauthenticated"){
   return <div style={{
    background : "#1f998c",
    display : "flex",
    justifyContent : "space-between",

   }}>
    <div>
        
        <button onClick={()=>{router.push('/')}}><img style={{width : "160px"}} src="logo.jpeg" alt="" /></button>
        </div>
     
     <div className= "flex mt-3">
        <div >
        <button className="bg-green-700 mr-4 rounded-full uppercase py-2 px-3 cursor-pointer tracking-wider border-2 hover:bg-transparent hover:text-stone-950 font-semibold"
                onClick={()=> router.push('/Signup')
                }
        >Sign Up</button>
        </div>
        <div>
        <button className="bg-green-700 mr-2 rounded-full uppercase py-2 px-3 cursor-pointer tracking-wider border-2 hover:bg-transparent hover:text-stone-950 font-semibold"
             onClick={()=>{
              signIn();
            }}
        >Log In</button>
        </div>
     </div>
    
   </div>}
   if(status === "authenticated"){
      return <div style={{
         background : "#1f998c",
        }} className="flex justify-end">
             <div >
        <button className="bg-green-700 mr-4 mt-3 rounded-full uppercase py-2 px-3 cursor-pointer tracking-wider border-2 hover:bg-transparent hover:text-stone-950 font-semibold"
                onClick={()=> signOut({ callbackUrl: '/' })}
        >Logout</button>
        </div>
      </div>
   }
}

