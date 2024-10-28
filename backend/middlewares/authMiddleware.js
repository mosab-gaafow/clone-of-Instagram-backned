import jwt from 'jsonwebtoken';
import {JWT_SECRET_KEY} from '../config/config.js'

export const authenticate = (req, res, next) => {
    // login-ka markan sameayaay ayaan Token generate gareeyay
    const token = req.cookies.token;

    if(!token){
        return res.status(403).send({
            status: false,
            message: "Access Denied No Token Provided, please Login First."
        });

       
    }

    try{
        const decoded = jwt.verify(token, JWT_SECRET_KEY)
        req.user = decoded;
        next();
    }catch(e){
        console.log("Jwt verification Error", e);
        return res.status(403).send({
            status: false,
            message: "Access Denied No Token Provided, please Login First."
        });
    }
}
