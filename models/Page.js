import mongoose from "mongoose";

const pageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    links: [{ type: mongoose.Schema.Types.ObjectId, ref: "Link" }],
  },
  { timestamps: true }
);

export default mongoose.model("Page", pageSchema);
