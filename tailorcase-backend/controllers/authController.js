// // // import User from '../models/User.js';
// // // import bcrypt from 'bcryptjs';
// // // import generateToken from '../utils/generateToken.js';

// // // export const signup = async (req, res) => {
// // //   const { name, email, password } = req.body;

// // //   const userExists = await User.findOne({ email });
// // //   if (userExists) return res.status(400).json({ message: 'User already exists' });

// // //   const hashedPassword = await bcrypt.hash(password, 10);
// // //   const user = await User.create({ name, email, password: hashedPassword });

// // //   if (user) {
// // //     res.status(201).json({ token: generateToken(user._id) });
// // //   } else {
// // //     res.status(400).json({ message: 'Invalid user data' });
// // //   }
// // // };

// // // export const login = async (req, res) => {
// // //   const { email, password } = req.body;
// // //   const user = await User.findOne({ email });

// // //   if (user && (await bcrypt.compare(password, user.password))) {
// // //     res.json({ token: generateToken(user._id) });
// // //   } else {
// // //     res.status(401).json({ message: 'Invalid email or password' });
// // //   }
// // // };

// // import bcrypt from "bcryptjs";
// // import jwt from "jsonwebtoken";
// // import User from "../models/User.js";
// // import dotenv from "dotenv";

// // dotenv.config();

// // // Signup Controller
// // export const signup = async (req, res) => {
// //   try {
// //     const { name, email, password } = req.body;

// //     // Check if user already exists
// //     const existingUser = await User.findOne({ email });
// //     if (existingUser) {
// //       return res.status(400).json({ message: "User already exists" });
// //     }

// //     // Hash the password
// //     const salt = await bcrypt.genSalt(10);
// //     const hashedPassword = await bcrypt.hash(password, salt);

// //     // Create a new user
// //     const newUser = new User({
// //       name,
// //       email,
// //       password: hashedPassword,
// //     });

// //     await newUser.save();

// //     // Generate JWT token
// //     const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
// //       expiresIn: "1h",
// //     });

// //     res.status(201).json({ message: "Signup successful", token, user: newUser });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ message: "Server error" });
// //   }
// // };

// // // Login Controller (if needed)
// // export const login = async (req, res) => {
// //   try {
// //     const { email, password } = req.body;

// //     // Check if user exists
// //     const user = await User.findOne({ email });
// //     if (!user) {
// //       return res.status(400).json({ message: "Invalid credentials" });
// //     }

// //     // Compare passwords
// //     const isMatch = await bcrypt.compare(password, user.password);
// //     if (!isMatch) {
// //       return res.status(400).json({ message: "Invalid credentials" });
// //     }

// //     // Generate JWT token
// //     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
// //       expiresIn: "1h",
// //     });

// //     res.status(200).json({ message: "Login successful", token, user });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ message: "Server error" });
// //   }
// // };

// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import User from "../models/User.js";
// import dotenv from "dotenv";

// dotenv.config();

// const createToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "3d" });
// };

// // Signup a user
// export const signup = async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     if (!name || !email || !password) {
//       return res.status(400).json({ error: "All fields are required" });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ error: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await User.create({ name, email, password: hashedPassword });

//     const token = createToken(user._id);
//     res.status(201).json({ email, token });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // Login a user
// export const login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     if (!email || !password) {
//       return res.status(400).json({ error: "All fields are required" });
//     }

//     const user = await User.findOne({ email });
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(400).json({ error: "Invalid credentials" });
//     }

//     const token = createToken(user._id);
//     res.status(200).json({ email, token });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Function to create a JWT token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Signup a new user
export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if all fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    // Generate token
    const token = createToken(user._id);
    res.status(201).json({ message: "User registered successfully", email, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login an existing user
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if all fields are provided
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Compare entered password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Generate token
    const token = createToken(user._id);
    res.status(200).json({ message: "Login successful", email, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
