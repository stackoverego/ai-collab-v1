import usermodel from "../models/user.model.js";
import { validationResult } from "express-validator";
import * as userservice from "../services/user.service.js";
import jwt from "jsonwebtoken";
import redisClient from "../services/redis.service.js"


export const createUserController = async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({ errors: errors.array() });
  }
  try {
    const user = await userservice.createUser(req.body);
    const token = await user.generateJWT();
    delete user._doc.password;
    res.status(201).json({ user, token });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

export const loginUserController = async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({ errors: errors.array() });
  }
  try {
    const { email, password } = req.body;
    const user = await usermodel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "invalid credentials" });
    }
    const isCompared = await user.isVaildPassword(password);
    if (!isCompared) {
      return res.status(401).json({ message: "invalid credentials" });
    }
    const token = await user.generateJWT();
    delete user._doc.password;
    res.send({ user, token });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

export const logoutUserController=async(req,res)=>{
  try {
    const token =req.cookies.token || req.headers.authorization.split(" ")[1];
    await redisClient.set(token,'logout','EX',60*60*24);
    res.status(200).json({message:"logged out"})
  } catch (error) {
    res.status(400).json(err);
  }
}

export const profileController = function (req, res) {
  return res.status(200).json({ user: req.user });
};
