import jwt from "jsonwebtoken";
import blacklistModal from "../models/blacklist.modal.js";

 export async  function authMiddleware(req,res,next){
    const token= req.cookies.token;
    if(!token){
        return res.status(401).json({message:"Unauthorized"})
    }
    const isTokenBlackListed = await blacklistModal.findOne({token:token})
    if(isTokenBlackListed){
        return res.status(401).json({message:"Token is Invalid"})
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next()
    } catch (error) {
        return res.status(401).json({message:"Token is Invalid"})
    }

 }