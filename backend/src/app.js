import express from 'express';
import morgan from 'morgan';
import userroutes from '../src/routes/user.routes.js'


const app=express();
app.use(express.json());
app.use(morgan('dev'));

app.use('/auth/user',userroutes);
app.get('/',(req,res)=>{
    res.send("hello world");
})

export default app;