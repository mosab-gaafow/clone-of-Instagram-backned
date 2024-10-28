import express from "express";
import { loginUser, registerUser, verifyUser } from "../controllers/userController.js";

const userRoute = express.Router();

userRoute.post('/register-user', registerUser);
userRoute.get('/verify-user', verifyUser);
userRoute.post('/login-user', loginUser)

userRoute.get('/', (req, res)=> {
    res.send('Alxamdulilaah waaye ❤️')
})


export default userRoute; 