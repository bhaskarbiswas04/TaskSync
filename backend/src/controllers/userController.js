import { User } from "../models/User.model.js";
import bcrypt from "bcryptjs"

export const signup = async (req, res)=>{

    try {
      const { name, email, password, confirmPassword } = req.body;

      //--Validations
      if (!name || !email || !password || !confirmPassword) {
        res.status(400).json({ message: "All fields are required." });
      }

      //-Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          message: "Invalid email format",
        });
      }

      //-check password
      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match." });
      }

      //-check existing user
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res
          .status(400)
          .json({ message: "User Already Exists. Try another email." });
      }

      //-hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      //-create new User
      await User.create({
        name,
        email,
        password: hashedPassword,
      });

      res.status(201).json({
        message: "User registered successfully",
        user: {
          _id: User._id,
          name: User.name,
          email: User.email,
        },
      });
    } catch (error) {
        console.log(error);
        res.status(500).json({
          message: "Server error",
        });
    }
}