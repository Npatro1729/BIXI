import axios from "axios";
import { useSession } from "next-auth/react";
import  Router  from "next/router";
import { FormEvent, useEffect, useState } from "react"





export default function Available(){
    const [evInput, setEvInput] = useState({ reg: "", type: "", range: "", speed: "" });
    const { status, data: session } = useSession();

    const handlesubmit = async (e: FormEvent) =>{
        e.preventDefault();
        try {
            const response = await axios.post(
                'api/admins/Ev',
                {
                 reg:evInput.reg,
                 type:evInput.type,
                 range:evInput.range,
                 speed:evInput.speed
                },
                {
                  headers: {
                    'Content-Type': 'application/json',
                  }
                }
              );
              const data = response.data;
              alert("Ev registered sussfully!");
        } catch (error) {
            
        }
    }

    
  useEffect(() => {
    if (status === "unauthenticated") Router.replace("/Login");
  }, [status]);
  useEffect(() => {
    if (status === "authenticated" && !session?.user?.admin) {
        alert("protected!");
        Router.push("/Login");
    }
  }, [status, session]);

if(status === "authenticated"){
    return <div style={{background : "#1f998c",}} className="flex justify-center items-center h-screen">
      <div className="w-96 p-6 shadow-lg bg-white rounded-md">
        <div className="text-neutral-950 mb-4">
            REGISTER A NEW EV HERE
        </div>
        <div>
            <label className="text-neutral-950" htmlFor="reg">reg:</label>
            <input className="text-neutral-950" type="text" 
             value={evInput.reg}
             onChange={(e) => setEvInput({ ...evInput, reg: e.target.value })}
            
            />
        </div>
        <div>
            <label className="text-neutral-950" htmlFor="type">Type:</label>
            <input className="text-neutral-950" type="text" 
             value={evInput.type}
             onChange={(e) => setEvInput({ ...evInput, type: e.target.value })}
            />
        </div>
         <div>
            <label className="text-neutral-950" htmlFor="range">Range:</label>
            <input className="text-neutral-950" type="number" 
            value={evInput.range}
            onChange={(e) => setEvInput({ ...evInput, range: e.target.value })}
            />
         </div>
         <div>
            <label className="text-neutral-950" htmlFor="speed">Top Speed</label>
            <input className="text-neutral-950" type="number"
            value={evInput.speed}
            onChange={(e) => setEvInput({ ...evInput, speed: e.target.value })}
            />
         </div>
         <button className="bg-green-700 mr-4 rounded-full uppercase py-2 px-3 cursor-pointer tracking-wider border-2 border-green-700 hover:bg-transparent hover:text-stone-950 font-semibold"
            onClick={handlesubmit}
    >ADD</button>
       </div>
    </div>
}
  }