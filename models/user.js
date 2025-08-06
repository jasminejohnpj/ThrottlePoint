import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  Firstname: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    minLength: 2,
    maxLength: 50,
  },
  Lastname: {
    type: String,
    required: [true, 'Last Name is required'],
    trim: true,
    minLength: 2,
    maxLength: 50,
  },
  Email: {
    type: String,
    required: [true, 'User Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Please fill a valid email address'],
  },
  Password: {
    type: String,
    required: [true, 'User Password is required'],
    minLength: 6,
  },
  Phonenumber: {
    type: String,
    // REMOVE `unique: true` here
    trim: true,
    match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number'],
  },
  City: {
    type: String,
    trim: true,
    match: [/^[a-zA-Z\s]+$/, 'City should only contain letters and spaces'], 
  },
  ProfilePic: {
    type: String,
    default: 'https://example.com/default-profile.png', 
    match: [/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/, 'Please provide a valid image URL'],
  }
}, { timestamps: true });

// Declare the sparse unique index explicitly to avoid duplicates on null values
userSchema.index({ Phonenumber: 1 }, { unique: true, sparse: true });


const User = mongoose.model('User', userSchema);

export default User;
