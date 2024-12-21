import React,{useState,useEffect} from "react";
import axios from "axios";
import Input from "./input";
function Home() {

  const [input,setinput]=useState("");
  const [res,setres]=useState([]);

  useEffect(() => {
    // Make GET request to fetch initial data
    axios.get("http://localhost:5000/data")
      .then((response) => {
        setres(response.data);
      })
      .catch((error) => {
        console.error("Error fetching initial data:", error);
      });
  }, []);
  
  function handleinputchange(value){
    setinput(value)
  }

  function handledelete(event){
    const unique=
    {
        "unique":event.target.id
    }
    axios
    .post("http://localhost:5000/delete",unique)
    .then((response)=>{

        setres(response.data)
        console.log(res)
    })
}
  return (
    <div className="bg-purple-200  p-16 mt-24 w-[32rem] mx-auto shadow-2xl rounded-xl">
      <h1 className="bg-purple-100 hover:bg-purple-300  py-3 text-center rounded-full text-2xl ">Drop in your To-do list</h1>
      <Input res={res} setres={setres} onhandle={handledelete} oninputchange={handleinputchange} input={input} name="input" />
      {
                res.map((r1,ind)=>(
                    <div className="grid grid-cols-[80%_20%] gap-3">
                    <p className=" animate-bounce hover:animate-none text-center bg-purple-300  px-5 py-3 rounded-xl m-3 font-semibold shadow-xl" key={ind}>{r1.input}</p>
                    <button className="animate-bounce hover:animate-none  focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium h-8 px-2 rounded-lg text-sm mt-[25px]" id ={r1._id} type="submit" onClick={handledelete}>DONE</button>
                    </div>   
                ))
            }
           
    </div>
  );
}

export default Home;
