import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
        email:{
            type : String,
            required : [true,"please provide an email"]
        },
        password :{
            type: String,
            required:[true,"please provide a password"]

        },
        isVerified:{
            type:Boolean,
            default :false
        },
        isAdmin:{
            type:Boolean,
            default :false
        }

})

const User = mongoose.models.users || mongoose.model("users",userSchema)

export default User;