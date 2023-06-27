import asyncHandler from "express-async-handler";
import Queue from "../model/queueModel.js";
import Customer from "../model/customerModel.js";

export const createQueue = asyncHandler(async (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const customerExists = await Customer.findOne({ phone }).lean().exec();

  if (customerExists) {
    const alreadyInQueue = await Queue.findOne({
      fullName: customerExists.fullName,
    });
    if (alreadyInQueue) {
      res.status(400);
      throw new Error("Already in queue.");
    }
    const queue = await Queue.create({
      fullName: customerExists.fullName,
      customerId: customerExists._id,
    });
    if (queue) {
      res.status(200).json("Successfully booked");
    } else {
      res.status(400);
      throw new Error("Cannot book");
    }
  } else {
    res.status(400);
    throw new Error("Please Register First");
  }
});

export const getAllQueue = asyncHandler(async (req, res) => {
  // const users = await User.find({}).sort({ createdAt: -1 });
  const queue = await Queue.find({}).lean();

  // If no queue
  if (queue) {
    res.status(200).json(queue);
  } else {
    return res.status(400).json({ message: "No queue found" });
  }
});

export const deleteQueue = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Does the queue exist to delete?
  const customer = await Queue.find({ customerId: id });
  const queue = await Queue.findById(customer[0]._id).exec();

  if (!queue) {
    res.status(400);
    throw new Error("queue not found");
  }

  await queue.deleteOne();

  const reply = ` deleted`;

  res.json(reply);
});
