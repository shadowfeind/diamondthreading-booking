import asyncHandler from "express-async-handler";
import Comment from "../model/commentModel.js";

export const createComment = asyncHandler(async (req, res) => {
  const { comment, customerId } = req.body;

  if (!comment || !customerId) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const comments = await Comment.create({
    comment,
    customerId,
  });
  if (comments) {
    res.status(201);
    res.json({
      _id: comments._id,
      comment,
      customerId,
    });
  } else {
    res.status(401);
    throw new Error("Cannot create Comment");
  }
});

export const getAllComment = asyncHandler(async (req, res) => {
  // const users = await User.find({}).sort({ createdAt: -1 });
  const comment = await Comment.find({}).sort({ createdAt: -1 }).lean();

  // If no Comment
  if (!comment?.length) {
    return res.status(400).json({ message: "No Comment found" });
  }

  res.json(comment);
});

export const getCommentByCustomer = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const comment = await Comment.find({ customerId: id })
    .sort({ createdAt: -1 })
    .lean();

  // If no Comment
  if (comment) {
    return res.status(200).json(comment);
  } else {
    return res.status(400).json({ message: "No Comment found" });
  }
});

export const deleteComment = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Does the Comment exist to delete?
  const comment = await Comment.findById(id).exec();

  if (!comment) {
    res.status(400);
    throw new Error("Comment not found");
  }

  const result = await comment.deleteOne();

  const reply = ` deleted`;

  res.json(reply);
});
