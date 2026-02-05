import mongoose from "mongoose";

const schema = new mongoose.Schema ({
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
schema.index({ email: 1 }, { unique: true })
const User = mongoose.model("userData", schema);

export default User;