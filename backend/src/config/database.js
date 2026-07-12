import mongoose from "mongoose";

 async function  connectToDB (){
    await mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("connected to database")
    })
}

export default connectToDB;