import express from "express";
const router = express.Router();
import {
  refresh,
  Signup,
  Login,
  Logout,
  getUser,
  // startMeeting,
} from "../controllers/user.ctrl.js";
import { verifyToken } from "../middlewares/auth.js";

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/logout", verifyToken, Logout);
router.post("/getuser", verifyToken, getUser);
// router.post("/start-meeting", verifyToken, startMeeting);

//token refresh route
router.post("/ref", refresh);

export default router;
