import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken"
import { sendEmail } from "../services/mail.service.js";

export async function register(req, res){
    
    const { username, email, password } = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        $or: [ {email}, {username}]
    })

    if(isUserAlreadyExists){
        return res.status(400).json({
            message: "User Already Exists",
            success: false,
            err: "Username already taken"
        })
    }

    const user = await userModel.create({ username, email, password })

    await sendEmail({
        to: email,
        subject: "Welcome to Perplexity!",
        html:   `<h1>Hi ${username}!</h1>
                <p>Thank you for registering at <strong>Perplexity</strong>. We're excited to have you on board!</p>
                <p>Feel free to explore our platform and let us know if you have any questions.</p>
                <p>Best regards,<br/>The Perplexity Team</p>`,
    })

    res.status(201).json({
        message: "User registered succesfully",
        success: true,
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}