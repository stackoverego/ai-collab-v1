import React, { useState } from "react";
import axios from "../config/axios";
const Home = () => {
  const [IsModal, setModal] = useState(false);
  const [projectname, setprojectname] = useState("");

  const Handler=(e)=>{
    e.preventDefault();
    axios.post('/project/create',{name:projectname})
    .then((res)=>{
      console.log(res.data)
      setModal(false);
      setprojectname("");
    })
    .catch((err)=>console.log(err))
  }

  return (
    <main>
      <div className="projects relative bg-emerald-300 h-screen w-screen">
        <header className="px-4 py-2">
          <button
            className="px-2 py-1 text-lg bg-slate-300 flex gap-1 rounded-sm hover:bg-slate-400"
            onClick={() => setModal(true)}
          >
            new project <i className="ri-run-line text-2xl"></i>
          </button>
        </header>
      </div>

      {IsModal && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="modal w-80 rounded-md bg-white p-4 shadow-lg">
            <form className="flex flex-col gap-3" onSubmit={(e)=>Handler(e)}>
              <label htmlFor="projectName" className="text-sm font-medium text-slate-700">
                Project name
              </label>
              <input
                id="projectName"
                type="text"
                onChange={(e)=>setprojectname(e.target.value)}
                value={projectname}
                className="rounded border border-slate-300 px-2 py-2 text-sm outline-none focus:border-emerald-500"
                placeholder="Enter project name"
              />
              <div className="btns flex w-full gap-1">
                <button
                type="submit"
                className="rounded w-full bg-emerald-500 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-600"
              >
                Submit
              </button>
              <button
                type="button"
                className="rounded w-full bg-red-500 px-3 py-2 text-sm font-medium text-white hover:bg-red-600"
                onClick={()=>setModal(false)}
              >
                Close
              </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
