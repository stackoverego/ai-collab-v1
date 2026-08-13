import 'dotenv/config.js'
import app from './src/app.js'
import http from 'http'
import connectToDB from './src/config/database.js';
import {Server} from 'socket.io'
import jwt from 'jsonwebtoken';
import mongoose, { mongo } from 'mongoose';
import projectModel from './src/models/project.model.js';

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

io.on('connection', socket => {
    const id=socket.project._id.toString();
    socket.join(id);
    console.log('room joined')
    console.log('a user connected')

    socket.on('project-message',data=>{
        console.log(data)
        socket.broadcast.to(id).emit('project-message',data);
    })

    socket.on('event', data => { /* … */ });
    socket.on('disconnect', () => {  });
});


connectToDB();
const port=process.env.PORT;
server.listen(port,()=>{
    console.log(`server started at port ${port}`)
})