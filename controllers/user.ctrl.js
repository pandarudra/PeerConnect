import { v4 as genuid } from "uuid";
import { User } from "../models/user.model.js";
import { compareHash, genHash } from "../utils/hasher.js";
import { genRefreshToken } from "../middlewares/auth.js";

import { genAccessToken } from "../middlewares/auth.js";
import jwt from "jsonwebtoken";
import { sendMail } from "../Mail/mail.js";

export const Signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = new User({
      name,
      email,
      password: await genHash(password),
      id: genuid(),
    });
    newUser.refToken = genRefreshToken(newUser);
    res.cookie("refToken", newUser.refToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    const token = genAccessToken(newUser);
    await newUser.save();
    sendMail(newUser.email, newUser.name)
      .then(() => {
        console.log("Email sent successfully");
      })
      .catch((err) => {
        console.log(err);
      });
    res.status(201).json({ message: "User created successfully", token });
  } catch (error) {
    console.log(error);
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isValid = await compareHash(password, user.password);
    if (!isValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    user.refToken = genRefreshToken(user);
    res.cookie("refToken", user.refToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    const token = genAccessToken(user);

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.log(error);
  }
};

export const refresh = async (req, res) => {
  const token = req.cookies.refToken;
  if (!token) {
    return res.status(401).json({ message: "Token Absent" });
  }
  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    const accessToken = genAccessToken(user);
    res.json({ accessToken });
  });
};

export const Logout = async (req, res) => {
  try {
    const user = req.user;
    // const newUser = await User.findById(user.user._id);
    // newUser.refToken = "";
    // await newUser.save();

    res.clearCookie("refToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.json({ message: "Logged out" });
  } catch (err) {
    console.log(err);
  }
};

export const getUser = async (req, res) => {
  const user = req.user;
  res.json({ user });
};

//meet controller under repair
// export const startMeeting = async (req, res) => {
//   const user = req.user;
//   const { meetId } = req.body;
//   const newUser = await User.findById(user.user._id);
//   newUser.meets.set(meetId, meetId);
//   await newUser.save();
//   res.json({ message: "Meeting started" });
// };
