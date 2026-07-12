import 'dotenv/config.js'
import app from './src/app.js'
import http from 'http'
import connectToDB from './src/config/database.js';

const server=http.createServer(app);
connectToDB();
const port=process.env.PORT;
server.listen(port,()=>{
    console.log(`server started at port ${port}`)
})