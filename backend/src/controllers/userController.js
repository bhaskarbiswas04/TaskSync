import { User } from "../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//---Register / Signup User
export const signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    //--Validations
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required." });
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
      return res
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

    return res.status(201).json({
      message: "User registered successfully",
      user: { name, email },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

//---Login User
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //--Validations
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    //-check user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    //-compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect Password" });
    }

    const tokenData = { userId: user._id };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    return res.status(200).json({
      message: "Logged In Successfull",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};


//--- Get loggedIn User
export const getLogInUser = async (req, res)=>{
    try {
        res.status(200).json({
            user: req.user,
        });
    } catch (error) {
        res.status(500).json({
          message: "Server error",
        });
    }
}

//--RouteLogic: GET- all users (including the logged-in user)
export const getAllUsers = async (req, res) => {
  try {
    // Find all users but only return name, email, and _id
    // We exclude 'password' for security
    const users = await User.find({}).select("name email");

    res.status(200).json({
      count: users.length,
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error while fetching users",
    });
  }
};
