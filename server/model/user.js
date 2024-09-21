import mongoose from "mongoose";
import bcrypt from 'bcryptjs';  // Instead of 'bcrypt'
import jwt from "jsonwebtoken"
import cypto from "crypto"

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        required: [true, 'Name is required'],
        minLength: [4, 'Name must be at least 5 charecter'],
        maxLength: [50, 'Nmae should be less than 50 charecter'],
    },
    lastName: {
        type: String,
        required: true,
        required: [true, 'Name is required'],
        minLength: [2, 'Name must be at least 5 charecter'],
        maxLength: [50, 'Nmae should be less than 50 charecter'],
    },
    email: {
        type: String,
        required: true,
        max: 50,
        lowercase: true,
        trim: true,
        unique: true,
        match: [/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/, 'Please fill the valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [8, 'Password must be less than 8 charecter'],
    },
    picturePath: {
        type: String,
        default: ""
    },
    friends: {
        type: Array,
        default: []
    },
    stream: String, // changes here
    skills: String, // changes here
    // bio: String,
    // forgotPasswordToken: String,
    // forgotPasswordExpiry: Date,
    // location: String,
    // occupation: String,
    achievement: String, // changes here
    bio: String, // changes here
    twitter: String,
    linkdin: String,
    // viewedProfile: Number,
    // impressions: Number,
}, {timestamps: true})


// Encription password code 
// UserSchema.pre('save', async function(next){
//     // if password is not modified or update 
//     if(this.isModified('password')){
//         return next()
//     }
//     // if password is modified or update 
//     this.password = await bcrypt.hash(this.password, 10)
// })

// methods
UserSchema.methods = {
    // generate jwt token 
    generateJWTToken: async function(){
        return await jwt.sign({
            id: this._id, email: this.email
        }, 
        process.env.JWT_SECRET,
        {
            expiresIn: '24h' //process.env.JWT_EXPIRY
        }
        )
    },

//     // compare password 
//     comparePasswrd: async function(plainTextPassword){
//         return await bcrypt.compare(plainTextPassword, this.password)
//     }, 

    // create reset password token 
    // createResetPasswordToken: async function(){
    //     const resetToke = crypto.randomBytes(32).toString('hex')

    //     this.forgotPasswordToken = crypto.createHash('sha256').update(resetToke).digest('hex')
    //     this.forgotPasswordExpiry = Date.now() + 10 * 60 * 1000

    //     return resetToke
    // }
} 


const User = mongoose.model("User", UserSchema)
export default User