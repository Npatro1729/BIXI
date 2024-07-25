import Router from "next/router";
import { useEffect, useState } from "react";

interface EvData {
    reg: string;
    type: string;
    range: number;
    speed: number;
    is_available: boolean;
  }

export default function Available(){
    const [data, setData] = useState<EvData[]>([]);


    useEffect(() => {
        const queryData = Router.query.data;
    
        if (typeof queryData === 'string') {
          try {
            setData(JSON.parse(queryData));
          } catch (error) {
            console.error('Failed to parse data:', error);
          }
        }
      }, [Router.query.data]);


 console.log(data);
  return <div style={{background : "#1f998c"}} className="justify-center h-screen md: items-center">
    
    {data.map((d) => {
        return <div className="w-96 p-6 shadow-lg bg-white rounded-md w-full md:w-56 mb-2 mr-2">
            <div className="m-2 p-2">
                <div className="text-stone-950 ">
                   Ev reg: {d.reg}
                </div>
                <div  className="text-stone-950 ">
                   Type: {d.type}
                </div>
                <div  className="text-stone-950 ">
                   Range: {d.range}
                </div>
                <div  className="text-stone-950 ">
                   Top Speed: {d.speed}
                </div>
                <button
                  type="submit"
                  className="border-2 border-green-700 bg-green-700 text-white py-1 w-full rounded-md hover:bg-transparent hover:text-stone-950 font-semibold"
                >
                  BOOK
                </button>
            </div>
        </div>
    })
    }
    
  </div>
}