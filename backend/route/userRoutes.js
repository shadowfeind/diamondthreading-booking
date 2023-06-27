import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controller/userController.js";

const router = express.Router();

router.route("/").post(createUser).get(getAllUsers);
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

export default router;
