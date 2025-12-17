import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateTolen.js";

export const createUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    console.log(req.body)
    const saltRounds = 10;
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Password and confirm password do not match" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    bcrypt.genSalt(saltRounds, async function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        const user = new User({ name, email, password: hash });
        await user.save();
        generateToken(user,res,"User created successfully");
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const hash = user.password;
    bcrypt.compare(password, hash, function (err, result) {
      if (result) {
         generateToken(user,res,"User logged in successfully");
       
      }
    });
  } catch (error) {
    return res.status(500).json({ success:false,message: error.message });
  }
};

export const getUser = async(req,res)=>{
    try {
        const user = await User.findById(req.id)
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:error.message})
    }
}

export const logout = (req, res) => {
  res.send("logout user");
};
