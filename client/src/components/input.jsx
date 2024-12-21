import React from "react";
import axios from "axios";
function Input(props){
    

    function handlechange(event){
        const val=event.target.value;
        props.oninputchange(val)
    }
function handlesubmit(event){
    event.preventDefault();
    const data=
    {"input":props.input
    }

    axios
    .post("https://todo-list-tailwindcss-backend.vercel.app/message",data)

    .then((response)=>{
        
        
        if(response.data==="already added"){
            alert("already added!")
        }else{
            props.setres(response.data)
        }
        console.log(response)
    })
    .catch((err)=>{
        console.log(err)
    })   
}



    return(
        <div>
        <form onSubmit={handlesubmit}  className="m-4 grid grid-cols-[80%_20%] gap-4 ml-2" >
            <input className="p-2 rounded-xl bg-purple-100 border-2 border-purple-700 hover:bg-[#d8b4fe]" name="name" type="text" onChange={handlechange} value={props.input} placeholder="enter here...." required></input>
            <button class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-3.5 py-2 mb-2 " type="submit">ADD</button>
            </form>   
        </div>
    );
}
export default Input;