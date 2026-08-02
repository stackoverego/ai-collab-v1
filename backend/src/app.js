import express from 'express';
import morgan from 'morgan';
import userroutes from '../src/routes/user.routes.js'
import cookieParser from 'cookie-parser'

const app=express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use('/auth/user',userroutes);
app.get('/',(req,res)=>{
    res.send("hello world");
})

export default app;