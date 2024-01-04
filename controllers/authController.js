import { comparePassword, hashPassword } from "../helper/authHelper.js";
import { User } from "../models/index.js";
import { validateUser } from "../validators/index.js";
import jwt from "jsonwebtoken";

//Sign UP
export const registerUser = async (req, res) => {
  try {
    //validate req.body with user schema
    const { error } = validateUser(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    //UserSchema validate successfully
    const { username, password } = req.body;
    //Existing username
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username is already taken" });
    }
    // Hash the password before storing it in the database
    const hashedPassword = await hashPassword(password);
    const user = await new User({ username, password: hashedPassword }).save();
    // Return user data (excluding password) in the response
    const userData = { _id: user._id, username: user.username };
    return res.status(200).json({
      status: true,
      message: "User registered successfully",
      user: userData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//Login
export const loggedInUser = async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { username, password } = req.body;
    const user = await User.findOne({ username });

    // User doesn't exist
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    // Compare the provided password with the hashed password in the database
    const hashedPassword = user.password;
    const isPasMatched = await comparePassword(password, hashedPassword);

    if (!isPasMatched)
      return res.status(401).json({ message: "Invalid credentials" });

    //Password matched, create token
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Return user data (excluding password) and set token in cookies
    const userData = { _id: user._id, username: user.username };
    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({
      status: true,
      message: "User login successfully",
      user: userData,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//Get User data
export const getUserData = async (req, res) => {
  try {
    const { userId } = req.user;
    //get user data excluding password
    const user = await User.findById(userId).select("-password");
    if (!user)
      return res.status(401).json({
        message: "Something went wrong in fetching current logged-in user data",
      });
    //otherwise return user data
    return res.status(200).json({
      status: true,
      message: "Fetched current loggedin user successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
