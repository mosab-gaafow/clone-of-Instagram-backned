import  jwt  from "jsonwebtoken";
import { JWT_SECRET_KEY, WEB_URL } from "../config/config.js";
import User from "../models/User.js";
import sendVerificationEmail from "../util/emails/sendVerificationToken.js";
import { generateVerificationToken } from "../util/generations.js";

export const registerUser = async(req, res, next) => {


    try{

        const { username, password, email }= req.body;

        const isUserExists = await User.findOne({
            // $and: labada in laso helo waaye
            // $or: midkood hadi laso helo: wxa la isticmala marka aa ku raadineso wax badan
            $or: [
                {email: email.toLowerCase()},
                {username: username.toLowerCase()}
            ]
        });

        // haddi uu jiro user-ka
        if(isUserExists) {
            // wa u cadenena meesha laga heesto
            if(isUserExists.email == email.toLowerCase()){
                return res.status(400).send("Email Already Exists!.")
            }
            if(isUserExists.username == username.toLowerCase()) {
                return res.status(400).send("Username Already Exists!.")
            }

        }
        // email  verification

        const verificationToken = generateVerificationToken();
        const tokenExpireDate = new Date();

        tokenExpireDate.setHours(tokenExpireDate.getHours() + 24); // saacada hadda la joogo 24 hours ugu dar email-ka


        // save the user
        const userInfo = new User({
            username,
            email,
            password,
            token: verificationToken,
            expireDate: tokenExpireDate
        });

        await userInfo.save();

        userInfo.password = undefined;
        // qaab-ka routes ka aa raacaa
        const verificationLink = `${WEB_URL}/users/verify-user?token=${verificationToken}&userId=${userInfo._id}`;
        //  email ka u dir
        sendVerificationEmail(email, verificationLink)

        res.status(201).send({
            message: "Registered Successful✅",
            data: userInfo
        });


    }catch(e) {
        console.log("Error at User Registration",e);
        res.status(400).send(e.message)
    }

};


export const verifyUser = async(req, res) => {

    try{
        // destructuring
        // const {token, userId: _id} = req.query;
        
        const token = req.query.token;
        const _id = req.query.userId;

        // console.log(tokenParams)
        // console.log(userParams);

        const user = await User.findOne({_id: _id, token:token});
        // user id-gaas iyo tokenkaas wato ba la raadina
        if(!user){
            return res.status(400).send("Invalid Token...");
        }

        // expirition Time ka ayaa fiirineena
            const expiritionTime = user.expireDate;
            // haddi la soo waayo oo u hore u isticmaalay ama uu ka yaryahy new Date

            if(!expiritionTime || expiritionTime < new Date()){
                return res.status(400).send("Token has Expired...")
            };

            // check the actual expiration Time
            const maxAge = new Date();
            // weli saacadi loo qabtay lama gaarin
            if(expiritionTime < maxAge){
                return res.status(400).send("Token has Expired...")
            }

            // email confirmed 
            user.isEmailConfirmed= true;
            user.token = undefined; // marba user-ka hadu verification-ka maro undefined la dhahaa markuu soo laabto token-ka uu wato maba jiro oo wuu is active gareeyay

            user.expireDate = undefined;

            await user.save();

            res.status(201).send({
                status: true,
                message: "Verification Successful✅"
            })

    }catch(e){
        console.log("Error at User Verification", e);
        res.status(400).send(e.message);
    }
};


export const loginUser = async (req,res) => {

    try {

        const { username, email, password } = req.body;

        const isUserExists = await User.findOne({
            $or:[
                // haddi aad wayso oo uu undefined yahay haba isku sii mashquulin waye
                {username: username?.toLowerCase()},
                {email: email?.toLowerCase()}
            ]
            
        }).select("+password");


        // OTP Assignment ahaan ayaa u sameena

        // haadi weli aan confirm la sameenin
        if(!isUserExists.isEmailConfirmed){
            return res.status(400).send("Confirm your Email First...")
        }

        // haddi lasoo waayo islamarkii hla celiyo

        if(!isUserExists){
            return res.status(400).send("Invalid username or Password❌...")
        };

        // compare  hashedpassword and password

        const validPassword = await isUserExists.comparePassword(password);
        // haddi password-ka qalad noqdo
        if(!validPassword){
            return res.status(400).send("Invalid username or Password❌...")
        };

        // haddi u sax noqdo
        // token aa generate gareenena
        const expiresIn = 2 * 60 // 2minute for testing
        const token  = jwt.sign({_id: isUserExists._id}, 
            JWT_SECRET_KEY, {expiresIn});
        
        res.cookie("token", token,{
            httpOnly: true,
            secure: false,
            // maxAge: 7 *24 *60 *60 *1000
            maxAge : expiresIn * 1000 // milisecond u bdal
        });

        isUserExists.password = undefined;

        res.status(200).send({...isUserExists.toJSON(),expiresIn});

           
    }catch(e){
        console.log("Login Failed...",e)
        res.status(400).send(e.message);
    }
}
 
