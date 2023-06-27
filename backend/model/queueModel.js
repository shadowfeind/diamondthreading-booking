import mongoose from "mongoose";

const QueueSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    customerId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Queue", QueueSchema);
