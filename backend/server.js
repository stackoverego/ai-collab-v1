import 'dotenv/config.js'
import app from './src/app.js'
import http from 'http'
import connectToDB from './src/config/database.js';
import {Server} from 'socket.io'
import jwt from 'jsonwebtoken';
import mongoose, { mongo } from 'mongoose';
import projectModel from './src/models/project.model.js';
import { askai } from './src/services/ai.service.js';
const server=http.createServer(app);


const io = new Server(server,{
    cors:{
        origin:"*"
    }
});

io.use(async(socket,next)=>{
    try {
        const token=socket.handshake.auth?.token ||
        socket.handshake.headers.authorization?.split(' ')[1];
        const projectId=socket.handshake.query.projectId;

        if(!mongoose.Types.ObjectId.isValid(projectId)){
            return next(new Error("invalid project"))
        }
        socket.project=await projectModel.findById(projectId);

        if(!token){
            return next(new Error("invalid user"))
        }

        const decoded=jwt.verify(token,process.env.JWT_SECRET);

        if(!decoded){
            return next(new Error("invalid user"))
        }
        socket.user=decoded;
        next()
    } catch (error) {
        next(error)
    }
})

io.on('connection',(socket) => {
    const id=socket.project._id.toString();
    socket.join(id);

    socket.on('project-message',async data=>{
        const message=data.msg
        const aiPresent=message.includes('@ai')
        socket.broadcast.to(id).emit('project-message',data);
        if(aiPresent){
            const prompt=message.replace('@ai', " ").trim();
            const result=await askai(prompt)
            io.to(id).emit('project-message',{
                msg:result,
                sender:{
                    id:"AI",
                    email:"AI"
                }
            })
        }
    })

    socket.on('event', data => { /* … */ });
    socket.on('disconnect', () => {socket.leave(id)  });
});


connectToDB();
const port=process.env.PORT;
server.listen(port,()=>{
    console.log(`server started at port ${port}`)
})