import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const AdminSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  admin_id: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Admin = mongoose.model("Admin", AdminSchema);
export default Admin;
