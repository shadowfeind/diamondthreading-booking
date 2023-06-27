import express from "express";
import {
  createComment,
  deleteComment,
  getAllComment,
  getCommentByCustomer,
} from "../controller/commentController.js";

const router = express.Router();

router.route("/").post(createComment).get(getAllComment);
router.route("/:id").get(getCommentByCustomer).delete(deleteComment);

export default router;
