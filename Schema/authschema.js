import mongoose from "mongoose";

const authSchema = new mongoose.Schema ({
    name:{
        type:String,
        required:true,
    },
    email:{
         type:String,
         required:true,
         unique:true
    },
    password:{
        type:String,
        required:true
    }
});
authSchema.index({ email: 1 }, { unique: true })
const User = mongoose.model("userData", authSchema);

export default User;