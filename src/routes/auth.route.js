
import { Router } from "express";
import { loginUserController, logoutController, registerUserController } from "../controllers/auth.controller.js";


const authRouter = Router();

/**
 * @route /api/auth/register
 * @description Register a new user
 * @access Public
 */
authRouter.post("/register", registerUserController);
/**
 * @route /api/auth/login
 * @description Login user
 * @access Public
 */
authRouter.post("/login", loginUserController);

/**
 * @route /api/auth/logout
 * @description Logout user
 * @access Private
 */
authRouter.get("/logout",logoutController)

export default authRouter;