import jwt from "jsonwebtoken";
import redisClient from "../services/redis.service.js";

export default async function authUser(req, res, next) {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "please login first" });
    }
    const isBlackListed=await redisClient.get(token);
    if(isBlackListed){
      return res.status(400).json({error:"token is invalid"});
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    return next();
  } catch (error) {
    return res.status(401).json({ error: "please authenticate first" });
  }
}
