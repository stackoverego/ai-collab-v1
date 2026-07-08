import 'dotenv/config.js'
import app from './src/app.js'
import http from 'http'


const server=http.createServer(app);

const port=process.env.PORT;
server.listen(port,()=>{
    console.log(`server started at port ${port}`)
})