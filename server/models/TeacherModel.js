import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const TeacherSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  teacher_id: {
    type: String,
    required: true,
    unique: true,
  },
  password:{
        type:String,
        required:true
    }

});

const Teacher = mongoose.model("Teacher", TeacherSchema);
export default Teacher;
