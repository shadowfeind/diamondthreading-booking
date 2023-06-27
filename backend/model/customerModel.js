import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    default: "",
  },
  phone: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Customer", CustomerSchema);
