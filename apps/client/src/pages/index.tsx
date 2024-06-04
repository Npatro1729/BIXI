import { Inter } from "next/font/google";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {

      
  return (
   
    <div>
      
      <div style={{background : "#1f998c"}} className="h-96">
        <div className="pt-30 text-center">
        <div className="text-9xl antialiased font-roboto">
          BIXI
        </div>
        <div className="text-2xl pl-2 antialiased">
          THE IDEAL RENTING OPTION
        </div>
        </div>
        <div className="text-center pt-20 text-xl font-serif antialiased">
          Go anywhere with BIXI
        </div>
      </div>

      <div style={{background : "#1f998c"}} className="flex justify-center items-center">
      <div className="text-center text-xl font-serif antialiased">
      Book a Ride Right NOW!
    </div>
    <div className="m-4">
        <button className="bg-green-700 mr-4 rounded-full uppercase py-2 px-3 cursor-pointer tracking-wider border-2 border-green-700 hover:bg-transparent hover:text-stone-950 font-semibold"
        ><Link href={"/Signup"}>Sign Up</Link> </button>
        </div>
      </div>
      
        <div >
      <img className="w-full " src="./bixi_1.PNG" />
    </div>
    <div>
        <img className="w-full " src="./bixi_2.PNG"  />
    </div>
    <div>
        <img className="w-full " src="./bixi_3.PNG"  />
    </div>
    <div >
        <img className="w-full" src="./bixi_4.PNG"  />
    </div>
    <div>
        <img className="w-full " src="./bixi_6.PNG"  />
    </div>
    </div>
    
  );
  
}
