import { NextPage } from "next"
import { useSession } from "next-auth/react";
import Router from "next/router";
import { useEffect } from "react";


const main:NextPage = () =>{
    const {status,data} = useSession();

    useEffect(()=>{
        if(status === "unauthenticated") Router.replace("/Login");
    },[status])
    if(status === "authenticated"){
    return <div>
      
      <div style={{background : "#1f998c"}} className="h-screen flex justify-center items-center">
      <div className="w-96 p-6 shadow-lg bg-white rounded-md">
                  <div className="text-neutral-950">
                    This page is work in progress!
                  </div>
                  <form action="">
                  <div>
                    <label htmlFor="pickup" className="text-neutral-950">pickup point:</label>
                    <select className="text-neutral-950 border w-full border-neutral-700 rounded-md" name="pickup points" id="pickup" required>
                      <option value="apj">APJ</option>
                      <option value="rhr">RHR</option>
                    </select>
                  </div>
                  <div className="mt-5">
                    <label className="text-neutral-950" htmlFor="pickup time">Pickup time:</label>
                    <input className="text-neutral-950 border w-24 border-neutral-700 ml-2 rounded-md" type="time" name="pickup time" id="pickup-time" required/>

                    </div>
                    <div className="mt-5">
                    <label className="text-neutral-950" htmlFor="pickup time">Drop time:</label>
                    <input className="text-neutral-950 border w-24 border-neutral-700 ml-2 rounded-md" type="time" name="drop time" id="drop-time" required/>

                    </div>
                    <div className="mt-5">
                      <label className="text-neutral-950" htmlFor="range">Required Range:</label>
                      <input className="text-neutral-950 border w-24 border-neutral-700 ml-2 rounded-md" type="number" name="range" id="range" placeholder="Kms"/>
                    </div>
                    <div className="mt-5">
                 <button type="submit" className="border-2 border-green-700 bg-green-700 text-white py-1 w-full rounded-md hover:bg-transparent hover:text-stone-950 font-semibold"
                 >Search</button>
             </div>
                  </form>
            </div>
            
  </div>
      </div>
  
}

  return <div>loading...</div>
}

export default main;
