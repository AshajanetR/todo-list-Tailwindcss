import React,{useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register(){
    
const [content,setcontent]=useState([
    {
    name:"",
    email:"",
    password:""
    }
])

const Navigate=useNavigate();
function handlechange(event){
const val=event.target.value;
const ele=event.target.name;

setcontent(prev=>{
    if(ele==="name"){
        return{
          ...prev,
          name:val
        }
    }else if(ele==="email"){
return{
    ...prev,
    email:val
}
    }else if(ele==="password"){
        return{
            ...prev,
            password:val
        }
       
    }
})
}

function handlesubmit(event){
event.preventDefault();

axios
.post('https://todo-list-tailwindcss-backend.vercel.app/register',content)
.then(res=>{
    console.log(res)
    if(res.data==="already registered!"){
        alert("E-mail already registered! Please login to proceed");
        Navigate('/login');
    }else{
        alert("Registered successfully! Please Login to proceed.")
        Navigate('/login');
    }
})
}
    return(
<div  className="bg-purple-200  p-16 mt-24 w-[32rem] mx-auto shadow-2xl rounded-xl ">
<div className="flex justify-center px-5 py-3">
    <h1 className="hover:bg-purple-300 px-12 py-4 inline shadow-2xl bg-[#faf5ff] rounded-full" >Register</h1>
</div>
    <div>
        <form onSubmit={handlesubmit}>
            <div>
                <label className="text-xl  p-3 w-40 " ><strong className='shadow-xl shadow-purple-400 rounded-sm' >Name</strong></label>
                <input className="bg-purple-100 border-2 border-purple-700 p-2 hover:bg-[#d8b4fe] " onChange={handlechange}  type="text" name="name" value={content.name} required></input>
            </div>
            <div>
                <label className="text-xl  p-3 w-40"><strong className='shadow-xl shadow-purple-400 rounded-sm' >Email Id</strong></label>
                <input  className="bg-purple-100 border-2 border-purple-700 p-2 hover:bg-[#d8b4fe]" onChange={handlechange} type="email" name="email" value={content.email} required></input>
            </div>
            <div>
                <label className="text-xl  p-3 w-40"><strong className='shadow-xl shadow-purple-400 rounded-sm' >Password</strong></label>
                <input  className="bg-purple-100 border-2 border-purple-700 p-2 hover:bg-[#d8b4fe]" onChange={handlechange}  type="password" name="password" value={content.password} required></input>
            </div>
            <div className="flex justify-center py-3 ">
                <button class="animate-bounce hover:animate-none focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 " type="submit">REGISTER</button>
            </div>
        </form>
        <div className="flex justify-center ">
            <a href="https://todo-list-tailwindcss-backend.vercel.app/auth" className="text-purple-700 shadow-sm ">Sign in with google</a>
        </div>
    </div>
</div>
 
)

    }
export default Register;