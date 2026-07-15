import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import userModel from "../models/user.model.js";
import errorHandler from "../middlewares/errorhandler.js";
import blacklistModal from "../models/blacklist.model.js";
import AppError from "../utils/AppError.js";

export const registerUserController = errorHandler(async (req, res) => {
  const { email, userName, password } = req.body;

  if (!email || !userName || !password) {
    throw new AppError("Please provide all the required fields", 400, "VALIDATION_ERROR");
  }

  const IsAlreadyExists = await userModel.findOne({
    $or: [{ email }, { userName }],
  });
  if (IsAlreadyExists) {
    throw new AppError("User or email already exists", 400, "USER_ALREADY_EXISTS");
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
      jti: randomUUID(),
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
    success: true,
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
    throw new AppError("Please fill all the required fields", 400, "VALIDATION_ERROR");
  }

  const user = await userModel.findOne({
    email,
  });
  if (!user) {
    throw new AppError("User not found", 404, "USER_NOT_FOUND");
  }

  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw new AppError("Invalid Password", 400, "INVALID_CREDENTIALS");
  }

  const token = jwt.sign(
    {
      id: user._id,
      jti: randomUUID(),
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    success: true,
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
    success: true,
    message: "User logged out successfully",
  });
});

export const getMeController = errorHandler(async (req, res) => {
  const user = await userModel.findById(req.user.id);
  if (!user) {
    throw new AppError("Unauthorized", 401, "UNAUTHORIZED");
  }
  
  res.status(200).json({
    success: true,
    message: "You are logged in",
    user: {
      userName: user.userName,
      email: user.email,
      id: user._id
    }
  });
});
