import Admin from "../models/admin.js";
import bcrypt from "bcryptjs";


export const admin = async (req, res, next) => {
    try {
        const { Username, Password } = req.body;
        const existingAdmin = await Admin.findOne({ Username });
        if (existingAdmin) {
            return res.status(401).json({message:"admin already exist"});
        }
        const hashedPassword = await bcrypt.hash(Password, 10);

        const newAdmin = await Admin.create({ Username, Password: hashedPassword });

        return res.status(200).json({ message: "Admin created Successfully", admin: newAdmin });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};


export const adminLogin = async (req,res, next) =>{
    try{
        const { Username, Password } = req.body;

        const existingAdmin = await Admin.findOne({ Username });
        if (!existingAdmin) {
            const error = new Error("Admin not registered");
            error.statusCode = 409;
            throw error;
        }

        const isPasswordValid = await bcrypt.compare(Password, existingAdmin.Password);
        if(!isPasswordValid){
            return res.status(401).json({message:"Invalid password"});
        }

        return res.status(200).json({message:"Login Successfully"});
    } catch(error){
        next(error);
    }
};
