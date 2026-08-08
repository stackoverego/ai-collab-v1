import e from "express";
import projectModel from "../models/project.model.js";

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

export const addUsers=async ({project,users,userid}) => {
    console.log(project,users,userid)
}