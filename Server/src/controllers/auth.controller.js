import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import userModel from "../models/user.modal.js";
import errorHandler from "../middlewares/errorhandler.js";
import blacklistModal from "../models/blacklist.modal.js";

export const registerUserController = errorHandler(async (req, res) => {
  const { email, userName, password } = req.body;

  if (!email || !userName || !password) {
    return res.status(400).json({
      message: "Please provide all the required fields",
    });
  }

  const IsAlreadyExists = await userModel.findOne({
    $or: [{ email }, { userName }],
  });
  if (IsAlreadyExists) {
    return res.status(400).json({
      message: "User or email already exists",
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    email,
    password: hashPassword,
    userName,
  });
  const token = jwt.sign(
    {
      id: user._id,
      jti:randomUUID(),
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(201).json({
    message: "User registered successfully",
    user: {
      userName: user.userName,
      email: user.email,
      id: user._id,
    },
  });
});

export const loginUserController = errorHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "Please fill all the required fields",
    });
  }

  const user = await userModel.findOne({
    email,
  });
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    return res.status(400).json({
      message: "Invalid Password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      jti:randomUUID(),
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    message: "User logged in successfully",
    user: {
      email: user.email,
      id: user._id,
    },
  });
});

export const logoutController = errorHandler(async (req, res) => {
  const token = req.cookies.token;
  if (token) {
    await blacklistModal.create({ token });
  }
  res.clearCookie("token");
  return res.status(200).json({
    message: "User logged out successfully",
  });
});

export const getMeController = errorHandler(async(req,res)=>{
  const user = await userModel.findById(req.user.id)
  if(!user){
    return res.status(401).json({
      message:"Unauthorized"
    })
  }
  res.status(201).json({
    message:"Your are logged in",
    user:{
      userName:user.userName,
      email:user.email,
      id:user._id
    }
  })
  
})
