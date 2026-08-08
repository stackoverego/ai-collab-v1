import express from 'express';
import morgan from 'morgan';
import userroutes from '../src/routes/user.routes.js'
import projectroutes from '../src/routes/project.routes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
const app=express();
app.use(express.json());
app.use(cors())
app.use(morgan('dev'));
app.use(cookieParser());
app.use('/auth/user',userroutes);
app.use('/project',projectroutes);
app.get('/',(req,res)=>{
    res.send("hello world");
})

export default app;