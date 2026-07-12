import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        require:true,
        trim:true,
        lowercase:true,
        unique:true,
        minlength:[6,'email should be atleast 6 characters long'],
        maxlength:[50,'email should be atmost 50 characters long'],
    },
    password:{
        type:String,
        select:false
    }
})

userSchema.statics.hashPassword=async function (password) {
       return await bcrypt.hash(password,10);
}

userSchema.methods.isVaildPassword=async function (password) {
       return await bcrypt.compare(password,this.password);
}
userSchema.methods.generateJWT=async function () {
   return await jwt.sign({email:this.email},process.env.JWT_SECRET)
}

const usermodel=mongoose.model("users",userSchema);


export default usermodel;