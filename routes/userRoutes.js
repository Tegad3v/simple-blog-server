import express from "express";
import * as authController from "../controllers/authController.js";

const userRoutes = express.Router();

userRoutes.route("/signup").post(authController.signUp);
userRoutes.route("/login").post(authController.logIn);

userRoutes.route("/forgot-password").post(authController.forgotPassword);
userRoutes.route("/reset-password/:token").patch(authController.resetPassword);

userRoutes
  .route("/me")
  .get(authController.protect, authController.getMe)
  .patch(authController.protect, authController.updateMe)
  .delete(authController.protect, authController.deleteMe);

userRoutes
  .route("/update-password")
  .patch(authController.protect, authController.updatePassword);

export default userRoutes;
