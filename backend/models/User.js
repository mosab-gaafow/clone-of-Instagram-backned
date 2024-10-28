import bcrypt from 'bcrypt';
import mongoose, { mongo } from 'mongoose';
import validator from 'validator';

// const schema = mongoose.schema;
const {Schema} = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
        validate: [validator.isEmail, "Please Enter a Valid Email.."]
    }, 
    username: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        validate: [
            {
                validator: function(value) {
                    return /^[A-Za-z][A-Za-z0-9_]{4,20}$/.test(value);
                },
                message: "Username must start with a letter and can only contain letters, numbers, and underscores."
            }
        ]
    },
    
    

    password: {
        type: String,
        required: true,
        select: false,
        validate : [
            {
                validator: function(value) {
                    validator.isStrongPassword(value)
                   
                },
                message: "Password must contain one or more Alphanumeric characters"
            }
        ]
    },

    isEmailConfirmed: {
        type: Boolean,
        default: false,
        required: true
    },

    token:{
        type: String,
        // required: true
    },
    
    expireDate:{
        type: Date,
    }


},

    {
        timestamps: true
    }

    );


// HASHED PASSWORD

userSchema.pre('save', async function (next) {
    // haddi password-ka aanan waxba laga badalin..
    if(!this.isModified("password")){
        return next();
    }

    // haddi pasword-ku cusbyahy
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next();
});

// compare password
userSchema.methods.comparePassword = async function (givenPassword){
    return await bcrypt.compare(givenPassword, this.password);


};




const User = mongoose.model('User', userSchema);
export default User