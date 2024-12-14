import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    page: { type: mongoose.Schema.Types.ObjectId, ref: "Page", required: true },
    pageOwner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);
