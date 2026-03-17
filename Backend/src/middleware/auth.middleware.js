import jwt from "jsonwebtoken"
import userModel from "../models/user.model.js"


export function authUser(req, res, next){

    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message: "Unauthorized",
            success: false,
            err: "Not token provided"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded

        next()

    } catch (err) {
        return res.status(401).json({
            message:"Unauthorized",
            success: "false",
            err: "Invalid token"
        })
    }
}