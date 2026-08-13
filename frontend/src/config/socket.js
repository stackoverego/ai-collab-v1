import socket from 'socket.io-client'

let socketInstance=null;

export const intializeSocket =(projectId)=>{
    socketInstance=socket(import.meta.env.VITE_API_URL,{
        auth:{
            token:localStorage.getItem('token')
        },
        query:{
            projectId
        }
    })
    return socketInstance;
}

export const sendMessage=(EventName,cb)=>{
    socketInstance.emit(EventName,cb);
}

export const ReceiveMessage=(EventName,cb)=>{
    socketInstance.on(EventName,cb);
}


