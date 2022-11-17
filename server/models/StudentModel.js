import mongoose from "mongoose";
import bcrypt from "bcryptjs"


const studentSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    SRN:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})


const Student = mongoose.model('Student',studentSchema);
export default Student;