import { FormEventHandler, useState } from "react";
import {signIn} from 'next-auth/react'
import Router from "next/router";




export default function login(){
    const [userinfo,setuserinfo] = useState({email: "",password: ""});
    const [loading,setLoading] = useState(false);

    const handlesubmit:FormEventHandler<HTMLFormElement>= async (e) =>{
        e.preventDefault();
        setLoading(true);
        
        try {
            const res = await signIn('credentials',{
                email:userinfo.email,
                password:userinfo.password,
                redirect:false
            })
            if(res?.error){
                console.error('error:', res.error)
                setLoading(false);
                alert('error:'+ res.error);
            }
            if(res?.ok){
                setLoading(false);
                Router.push("/main");
            }
        } catch (error) {
            setLoading(false);
            console.error('Signup error:', error);
        }
    }

    return <div>
        {loading ? (
            <div>
                loading...
            </div>
        ) : (
        <div style={{background : "#1f998c",}} className="flex justify-center items-center h-screen">
        <div className="w-96 p-6 shadow-lg bg-white rounded-md">
            <h1 className="text-stone-950 font-semibold text-center text-3xl antialiased font-roboto"> LOGIN</h1>
             <div className="mt-3">
                <label htmlFor="email" className = "block text-base mb-2 text-stone-950">Email</label>
                <input type="email" id="email" className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 text-stone-950" 
                placeholder="Enter Email..." required
                value={userinfo.email}
                onChange={({target}) => {
                    setuserinfo({...userinfo,email:target.value})
                }}
                />
             </div>
             <div className="mt-3">
                <label htmlFor="password" className = "block text-base mb-2 text-stone-950">Password</label>
                <input type="password" id="password" className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 text-stone-950" 
                placeholder="Enter password..." required
                value={userinfo.password}
                onChange={({target}) => {
                    setuserinfo({...userinfo,password:target.value})
                }}
                />
             </div>
             <div className="mt-5">
                <form onSubmit={handlesubmit}>
                 <button  type="submit" className="border-2 border-green-700 bg-green-700 text-white py-1 w-full rounded-md hover:bg-transparent hover:text-stone-950 font-semibold"
                 
                 >Login</button>
                 </form>
             </div>
             <div className="text-stone-950 mt-1">
                New Here? Signup Below
             </div>
             <div className="mt-2">
        <button className="bg-green-700 mr-4 rounded-full uppercase py-2 px-3 cursor-pointer tracking-wider border-2 border-green-700 hover:bg-transparent hover:text-stone-950 font-semibold"
                onClick={()=> Router.push('/Signup')
                }
        >Sign Up</button>
        </div>
        </div>
    </div>)}
    </div>
}