import nodemailer from 'nodemailer';
import { APP_PASSWORD } from '../../config/config.js';

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: "muscabinhoyare@gmail.com",
        pass: APP_PASSWORD
    }
});

// send Email

const sendVerificationEmail = (to, verificationLink) => {
    const mailOptions = {
        from: "gaafow40@gmail.com",
        to,
        subject: "Verification Email",
        html: `Click the link below to verify your Email ${verificationLink}✅`

    };

    // dir email ka
    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.log("error sending verification",error)
            return "Failed to send Verification"
        }
        else{
            console.log("Successfully sent verification")
            return "Successfully sent Verification"
        }
    })
}

export default sendVerificationEmail;

