import usermodel from "../models/user.model.js";

export const createUser=async({email,password})=>{
        if(!email && !password){
            throw new Error("email and password required");
        }
        const hashedpassword= await usermodel.hashPassword(password);
        const user= await usermodel.create({
            email,
            password:hashedpassword
        })
        return user;
}