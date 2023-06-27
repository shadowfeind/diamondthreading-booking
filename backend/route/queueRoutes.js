import express from "express";
import {
  createQueue,
  deleteQueue,
  getAllQueue,
} from "../controller/queueController.js";

const router = express.Router();

router.route("/").post(createQueue).get(getAllQueue);
router.route("/:id").delete(deleteQueue);

export default router;
