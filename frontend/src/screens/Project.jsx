import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/usercontext";
import { useLocation } from "react-router-dom";
import axios from "../config/axios";
import { intializeSocket, sendMessage, ReceiveMessage } from "../config/socket";

import Markdown from "markdown-to-jsx";

const Project = () => {
  const location = useLocation(); // to get the specific project
  const [ismodal, setismodal] = useState(false); //project modal
  const [isModalOpen, setIsModalOpen] = useState(false); // users add modal
  const [users, setUsers] = useState([]); //all users
  const [selectedUsers, setselectedUsers] = useState([]); //add users to exisiting project
  const { User } = useContext(UserContext); //logged in user ka data
  const [ProjectDetail, setProjectDetail] = useState(location.state.project); //current project
  const [msg, setmsg] = useState(""); // current msg jo user send karega
  const [messages, setmessages] = useState([]);
  // console.log(User)

  const handleClick = (id) => {
    setselectedUsers((prevselectedusers) => {
      const newusers = new Set(prevselectedusers);

      if (newusers.has(id)) {
        newusers.delete(id);
      } else {
        newusers.add(id);
      }

      return newusers;
    });
  };

  const addCollaborators = () => {
    axios
      .put("/project/add-user", { projectId: location.state.project._id, users: Array.from(selectedUsers) })
      .then((res) => {
        console.log(res.data);
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const send = () => {
    if (!msg.trim()) {
      // agar msg empty he to jayega hi nhi
      return;
    }
    sendMessage("project-message", {
      msg,
      sender: User,
    });
    setmsg(" ");
    setmessages((history) => [...history, { msg, sender: User }]);
  
  };


  const ScrollToBottom = () => {
    const div = document.querySelector(".conversations");
    div.scrollTop = div.scrollHeight;
  };

  useEffect(() => {
    intializeSocket(ProjectDetail._id);
    axios
      .get("auth/user/all")
      .then((res) => setUsers(res.data.users))
      .catch((err) => console.log(err));

    ReceiveMessage("project-message", (data) => {
      setmessages((history) => [...history, data]);
    });

    axios
      .post(`/project/get-project/${location.state.project._id}`)
      .then((res) => {
        setProjectDetail(res.data.project);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <main className="h-screen w-screen  flex">
      <section className="left h-screen min-w-1/4 bg-slate-400 flex flex-col relative ">
        <header className="bg-slate-500 w-full h-fit p-2 px-6 text-white flex justify-between">
          <button className="cursor-pointer text-xl " onClick={() => setismodal(true)}>
            <i className="ri-group-fill"></i>
          </button>
          <button className="cursor-pointer flex items-center gap-2 text-md" onClick={() => setIsModalOpen(true)}>
            <i className="ri-user-add-line"></i>
            <small>Add Collaborators</small>
          </button>
        </header>
        <div className="conversations flex grow flex-col p-1 gap-1 max-h-full bg-red-200 overflow-auto">
          {messages.map((message, idx) => (
            <div key={idx} className={`outcoming p-2 rounded-sm  
    ${message.sender._id == "AI" ? "w-96 bg-black text-white" : "w-72 bg-white text-black"}
    ${message.sender._id === User._id ? "ml-auto" : "mr-auto"}
  `}
            >
              <small className="opacity-70">{message.sender.email}</small>
                  {console.log(message)}
              {message.sender._id === "AI" ? (
                <div className="overflow-auto">
                  <Markdown>{message.msg}</Markdown>
                </div>
              ) : (
                <p className="break-all">{message.msg}</p>
              )}
            </div>
          ))}
        </div>
        <div className="inputfield w-full  flex">
          <input
            value={msg}
            onChange={(e) => setmsg(e.target.value)}
            type="text"
            className="bg-white p-2 border-0 rounded-sm font-semibold w-full outline-none "
            placeholder="enter the message"
          />
          <button className="px-4 py-2 border-0 bg-sky-400 rounded-sm" onClick={send}>
            <i className="ri-send-ins-fill"></i>
          </button>
        </div>

        <div
          className={`sidebar bg-slate-400 absolute  h-full w-full transition-all duration-400 ${ismodal ? "translate-x-0" : "-translate-x-full"}`}
        >
          <header className="bg-slate-500 w-full h-fit p-2 px-6 transition-all text-white flex justify-end">
            <button className="cursor-pointer text-xl " onClick={() => setismodal(false)}>
              <i className="ri-close-large-fill"></i>
            </button>
          </header>
          <div className="flex flex-col gap-1 p-1">
            {ProjectDetail.users &&
              ProjectDetail.users.map((user, idx) => (
                <div
                  key={idx}
                  className="user bg-slate-500 px-2 py-3 flex gap-2 w-full rounded-sm font-bold  items-center"
                >
                  <div className="profile rounded-full h-10 w-10 bg-white"></div>
                  <p>{user.email}</p>
                </div>
              ))}
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0  flex items-center justify-center">
            <div className="bg-white p-4 rounded-md w-96 max-w-full relative">
              <header className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Select User</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2">
                  <i className="ri-close-fill"></i>
                </button>
              </header>
              <div className="users-list flex flex-col gap-2 mb-16 max-h-96 overflow-auto">
                {users.map((user) => (
                  <div
                    key={user._id}
                    className={`user cursor-pointer hover:bg-slate-200 ${Array.from(selectedUsers).indexOf(user._id) != -1 ? "bg-slate-200" : ""} p-2 flex gap-2 items-center`}
                    onClick={() => handleClick(user._id)}
                  >
                    <div className="aspect-square relative rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600">
                      <i className="ri-user-fill absolute"></i>
                    </div>
                    <h1 className="font-semibold text-lg">{user.email}</h1>
                  </div>
                ))}
              </div>
              <button
                onClick={addCollaborators}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                Add Collaborators
              </button>
            </div>
          </div>
        )}
      </section>

      <section className="right h-screen flex grow bg-slate-300 ">user:{JSON.stringify(User)};</section>
    </main>
  );
};

export default Project;
