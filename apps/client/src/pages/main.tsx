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
    this page is WORK IN PROGRESS!
  </div>}

  return <div>loading...</div>
}

export default main;