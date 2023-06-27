import asyncHandler from "express-async-handler";
import User from "../model/userModel.js";

export const createUser = asyncHandler(async (req, res) => {
  const { name, userName, password, role } = req.body;

  if (!name || !password || !userName) {
    res.status(400);
    throw new Error("All fields are required");
  }
  const userNameExists = await User.findOne({ userName }).lean().exec();
  if (userNameExists) {
    res.status(400);
    throw new Error("Username already exists");
  }

  const user = await User.create({
    name,
    userName,
    password,
    role,
  });
  if (user) {
    res.status(201);
    res.json({
      _id: user._id,
      name,
      userName,
      role,
    });
  } else {
    res.status(401);
    throw new Error("Cannot create user");
  }
});

export const getAllUsers = asyncHandler(async (req, res) => {
  // const users = await User.find({}).sort({ createdAt: -1 });
  const users = await User.find({})
    .select("-password")
    .sort({ createdAt: -1 })
    .lean();

  // If no users
  if (!users?.length) {
    return res.status(400).json({ message: "No users found" });
  }

  res.json(users);
});

export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.role = req.body.role || user.role;
    user.email = req.body.email || user.email;

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      role: updatedUser.role,
    });
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Does the user exist to delete?
  const user = await User.findById(id).exec();

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  const result = await user.deleteOne();

  const reply = `Username ${result.username} with ID ${result._id} deleted`;

  res.json(reply);
});
