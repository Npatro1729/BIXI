import Link from "next/link"
import { useEffect, useState } from "react";
import {signIn} from 'next-auth/react'
import {useRouter} from"next/router"


export function Appbar(){
    const router = useRouter();
  //  const session = useSession();
//    const navigate = useNavigate();
//    const [username,setUsername] = useState(null);
//    useEffect(()=>{
//       let Token = localStorage.getItem("token");
//      if(Token != null){ 
//       fetch("http://localhost:3000/admin/me",{
//          method : "GET",
//          headers :{
//             "Authorization": "Bearer " + localStorage.getItem("token")
//          }
//      }).then((res)=>{
//          res.json().then((data)=>{
//              setUsername(data.username);
             
//          })
//      })
//    }
//    },[])

//    if(username){
//       return <div style={{
//          display : "flex",
//          justifyContent : "space-between",
//          paddingTop: 4
//         }}>
//          <div><Typography>CourseCraft</Typography></div>
          
//           <div style={{display : "flex",justifyContent : "space-between"}}>
//                {/* <div>
//                   {username}
//                </div> */}
//                <Button style={{marginRight : 10}} variant="contained" 
//                 //   onClick={()=>{
//                 //      window.location = "/createcourse"
//                 //   }}
//                > Create Courses</Button>
//                 <Button style={{marginRight : 10,marginLeft : 10}} variant="contained" 
//                 //   onClick={()=>{
//                 //      window.location = "/courses"
//                 //   }}
//                > Courses</Button>

//              <div style={{marginRight : 10}}>
              
//              <Button variant="contained"
//                     //  onClick={()=>{
//                     //     localStorage.setItem("token",null);
//                     //      window.location = "/"
//                     //  }}
//              >logout</Button>
//              </div>
//           </div>
         
//         </div>
//    }
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
    
   </div>
}

