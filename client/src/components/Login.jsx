import 'bootstrap/dist/css/bootstrap.min.css';
import React,{useState} from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login(){

    const [content,setcontent]=useState({
        email:"",
        password:""
    });
const Navigate=useNavigate();
    function handlechange(event){
const {name,value}=event.target;
setcontent(prev=>({
            ...prev,
            [name]:value        
}))
    }

    function handlesubmit(event){
        event.preventDefault();
        axios 
        .post("https://todo-list-tailwindcss-backend.vercel.app/login",content)
        .then(res=>{
            console.log(res)
            if(res.data==='success'){
                alert("login successful")
                Navigate("/Home");
                
            }else{
                alert("incorrect password! Please try again.")
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }
    return(
        <div className="bg-purple-200 p-6 mt-24 w-[32rem] mx-auto rounded-lg shadow-2xl">
        <div className="flex justify-center px-5 py-3">
    <h1 className="hover:bg-purple-300 px-12 py-4 inline shadow-2xl bg-[#faf5ff] rounded-full" >Login</h1>
</div>
    <form onSubmit={handlesubmit}>
    <div className="">
        <label className="text-xl p-3 w-40"><strong className='shadow-xl shadow-purple-400 rounded-sm'>Email Id</strong></label>
        <input className="bg-purple-100 border-2 border-purple-700 p-2 hover:bg-[#d8b4fe]" name="email" type="email" onChange={handlechange} value={content.email} required></input>
        </div>
        <div className="">
        <label className="text-xl p-3 w-40"><strong className='shadow-xl shadow-purple-400 rounded-sm'>Password</strong></label>
        <input className="bg-purple-100 border-2 border-purple-700 p-2 hover:bg-[#d8b4fe]" name="password" type="password" onChange={handlechange} value={content.password} required></input>
        </div>
        <div className="flex justify-center">
        <button class="animate-bounce hover:animate-none focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 mt-4" type="submit" > LOGIN </button>
        </div>
    </form>
</div>
    )

}
export default Login;
