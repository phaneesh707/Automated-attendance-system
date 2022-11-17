import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const AttendanceSchema = mongoose.Schema({
    course_name:{
        type:String,
        required:true
    },
    course_id:{
        type:String,
        required:true,
        unique:true
    },
    bool_present:{
        type:Boolean,
        required:true
    },
    student:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Student'
    },
    date:{
        type:Date,
        default:Date.now
    }
    
});

const Attendance = mongoose.model("Attendance", AttendanceSchema);
export default Attendance;
