import e from "express";
import projectModel from "../models/project.model.js";
import mongoose from "mongoose";

export const createProject=async ({name,userId}) => {
    console.log(name,userId)
    if(!name){
        throw new Error("Invalid name")
    }
    if(!userId){
        throw new Error("Invalid user")
    }
    let project;
    try {
        project=projectModel.create({name,users:[userId],})
    } catch (error) {
        if(error.code ===1100){
            throw new Error("project name already exist")
        }
        throw error;
    }
    return project;
}

export const getAllProjectsByUserId=async ({userid}) => {
    if(!userid){
        throw new Error("invalid user");
    }

    const allprojects=await projectModel.find({users:userid});
    return allprojects;
}

export const addUsers=async ({projectId,users,userid}) => {
    if(!projectId){
        throw new Error("Invalid ProjectId")
    }
    if(!users){
        throw new Error("Invalid users")
    }
    if(!userid){
        throw new Error("Invalid userId")
    }
    if(!mongoose.Types.ObjectId.isValid(projectId)){
        throw new Error("Invalid projectId")
    }
    if(!mongoose.Types.ObjectId.isValid(userid)){
        throw new Error("Invalid userId")
    }
    if (!Array.isArray(users) ||users.some((userid) => !mongoose.Types.ObjectId.isValid(userid))) {
        throw new Error("Invalid userId");
    }
    const project= await projectModel.findOne({
        _id:projectId,
        users:userid
    })
    if(!project){
        throw new Error("User is not in Project")
    }
    const updatedProject=projectModel.findOneAndUpdate({
        _id:projectId},
        {
            $addToSet:{
                users:{
                    $each:users
                }
            }
        },{
            $new:true
        }
    )
    return updatedProject;
}

export const GetProject=async ({projectid}) => {
    console.log(projectid)
    if(!projectid){
        throw new Error("invalid project");
    }
    if(!mongoose.Types.ObjectId.isValid(projectid)){
        throw new Error("invalid project")
    }
    const project=await projectModel.findOne({_id:projectid}).populate('users');
    return project;
}