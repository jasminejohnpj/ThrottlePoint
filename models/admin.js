import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  Username: {
    type: String,
    required: [true, ' Username is required'],
    trim: true,
    minLength: 2,
    maxLength: 50,
  },
  Password: {
    type: String,
    required: [true, 'User Password is required'],
    minLength: 6,
  },
}, { timestamps: true });



const Admin = mongoose.model('Admin', adminSchema);

export default Admin;
