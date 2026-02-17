import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
    name:{
        type:String,
        requedrequired:true,
    },
    profession:{
        type:String,
        requedrequired:true,
    },
    summery:{
        type:String,
        requedrequired:true,
    },
    skills:{
        type:[String],
        requedrequired:true,
    },
    language:{
        type:[String],
        requedrequired:true,
    },
    experience:{
        type:String,
        requedrequired:true,
    },
});

export default mongoose.model("resumeData", resumeSchema);