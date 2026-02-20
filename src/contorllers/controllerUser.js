import User from "../models/modelsUsers.js";
import bcrypt from "bcrypt";
import generateAccessToken from "../utils/token.js";
import asyncHandler from "express-async-handler";
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }
  const user = await User.findOne({ email });
  if (user) {
    res.status(400);
    throw new Error("User already exists");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ name, email, password: hashPassword });
  const token = generateAccessToken(newUser._id);
  res
    .status(201)
    .json({ message: "User created successfully", newUser, token });
});
// const register = asyncHandler(async (req, res) => {
//   const { error } = registerSchema.validate(req.body);
//   if (error) {
//     res.status(400);
//     console.log(error.details[0].message);
//     throw new Error(error.details[0].message);
//   }

//   const { _id, name, email, token } = await authService.registerUser(req.body);

//   res.status(201).json({
//     _id,
//     name,
//     email,
//     token,
//   });
// });
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const isMatch = await bcrypt.compare(password, user.password);
  if (!user || !isMatch) {
    res.status(404);
    throw new Error("wrong email or password");
  }
  const token = generateAccessToken(user._id);
  res.status(200).json({ message: "Login successful", user, token });
});
const getUser = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const accessToken = await generateAccessToken(user.id);
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      token: accessToken,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export { register, login, getUser };
