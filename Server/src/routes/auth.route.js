
import { Router } from "express";
import { getMeController, loginUserController, logoutController, registerUserController } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

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
authRouter.get("/logout",authMiddleware,logoutController)

/**
 * @name /api/auth/getMe
 * @description get the loggedIn user
 * @access Private
 */
authRouter.get("/getMe",authMiddleware,getMeController)

export default authRouter;