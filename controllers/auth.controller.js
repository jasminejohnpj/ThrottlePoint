import bcrypt from "bcryptjs";

import User from '../models/user.js';


export const signUp = async (req, res, next) => {
  try {
    const { Firstname, Lastname, Email, Password } = req.body;

    const existingUser = await User.findOne({ Email });
    if (existingUser) {
      const error = new Error("User already exists");
      error.statusCode = 409;
      throw error;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Password, salt);

    const newUser = await User.create({ Firstname, Lastname, Email, Password: hashedPassword });

    req.user = newUser;
    next();

  } catch (error) {
    next(error);
  }
};


export const signIn = async(req , res, next) =>{
    try {
    const {Email ,Password } = req.body;
    
    const existingUser = await User.findOne({Email});

    if(!existingUser){
        return res.status(401).json({message:"user not exist"});
    }
    
    const isPasswordValid = await bcrypt.compare(Password, existingUser.Password);
    if(!isPasswordValid){
        return res.status(401).json({ message: "Invalid password" });
        
    }
      req.user = existingUser;
      next();

    
  } catch (error) {
    next(error);
  }
}

export const resetPassword = async (req, res, next) => {
  try {
    const { Email, Password } = req.body;

    if (!Email || !Password) {
      const error = new Error("Email and new password are required");
      error.statusCode = 400;
      throw error;
    }

    const existingUser = await User.findOne({ Email });
    if (!existingUser) {
      const error = new Error("User does not exist");
      error.statusCode = 404;
      throw error;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Password, salt);

    existingUser.Password = hashedPassword;
    await existingUser.save({ validateBeforeSave: false }); 

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
    
  } catch (error) {
    next(error);
  }
};