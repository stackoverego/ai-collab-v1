import {validationResult} from 'express-validator'
import * as projectService from '../services/project.service.js'
import usermodel from '../models/user.model.js';

export const createProject=async (req,res) => {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
       return res.status(400).json({errors:errors.array()});
    }
    const{name}=req.body; //auth user se mila tha 
    const loggedInUser=await usermodel.findOne({email:req.user.email}) //auth user me set kiya tha
    if (!loggedInUser) {
            return res.status(404).json({ message: "User not found" });
    }
    const userId=loggedInUser._id;
    try {
        const newProject=await projectService.createProject({name,userId})
       return res.status(201).json({newProject});
    } catch (error) {
        return res.status(400).json({message:error.message});
    }
}

export const getAllProjects=async (req,res) => {
    try {
        const loggedInUser=await usermodel.findOne({email:req.user.email});
        const projects=await  projectService.getAllProjectsByUserId({userid:loggedInUser._id});
        return res.status(200).json({projects});
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}

export const addUsersToProject=async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({message:errors.array()});
    }
    try {
    const {projectId,users}=req.body;
    const loggedInUser=await usermodel.findOne({email:req.user.email});
    const projects= await projectService.addUsers({projectId,users,userid:loggedInUser._id});
    return res.status(201).json(projects)
    
    } catch (error) {
    return res.status(400).json({message:error.message});
    }
}

export const getProjectDetails=async (req,res) => {
    try {
    const projectid=req.params;
    const project=await projectService.GetProject(projectid);
    return res.status(200).json({project})
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}