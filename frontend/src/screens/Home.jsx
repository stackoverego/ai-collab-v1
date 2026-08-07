import React, { useState } from "react";

const Home = () => {
  const [ismodal, setismodal] = useState(false);

  return (
    <main className="h-screen w-screen  flex">
      <section className="left h-screen min-w-96 bg-slate-400 flex flex-col relative ">
        <header className="bg-slate-500 w-full h-fit p-2 px-6 text-white flex justify-end">
          <button className="cursor-pointer text-xl " onClick={()=>setismodal(true)} >
            <i className="ri-group-fill"></i>
          </button>
        </header>
        <div className="conversations flex grow flex-col p-1 gap-1 ">
          <div className=" p-2 rounded-sm  bg-slate-200 border-0 min-w-60 mr-auto">
            <small className="opacity-70">parth@gmail.com</small>
            <p>hello</p>
          </div>
          <div className=" p-2 rounded-sm  bg-slate-200 border-0 min-w-60 ml-auto">
            <small className="opacity-70">parth@gmail.com</small>
            <p>hello</p>
          </div>
        </div>
        <div className="inputfield w-full  flex">
          <input
            type="text"
            className="bg-white p-2 border-0 rounded-sm font-semibold w-full outline-none "
            placeholder="enter the message"
          />
          <button className="px-4 py-2 border-0 bg-sky-400 rounded-sm">
            <i className="ri-send-ins-fill"></i>
          </button>
        </div>

          <div className={`sidebar bg-slate-400 absolute  h-full w-full transition-all duration-400 ${ismodal?"translate-x-0":"-translate-x-full"}`} >
            <header className="bg-slate-500 w-full h-fit p-2 px-6 transition-all text-white flex justify-end">
              <button className="cursor-pointer text-xl " onClick={()=>setismodal(false)}>
                <i className="ri-close-large-fill"></i>
              </button>
            </header>
            <div className="users flex flex-col gap-1 p-1">
              <div className="user bg-red-500 px-2 py-3 flex gap-2 w-full rounded-sm  items-center" >
                <div className="profile rounded-full h-10 w-10 bg-white">
                </div>
                <p>parth@patil.com</p>
              </div>
              <div className="user bg-red-500 px-2 py-3 flex gap-2 w-full rounded-sm  items-center" >
                <div className="profile rounded-full h-10 w-10 bg-white">
                </div>
                <p>parth@patil.com</p>
              </div>
            </div>
          </div>
      
      </section>

      <section className="right h-screen flex grow bg-slate-300 "></section>
    </main>
  );
};

export default Home;
