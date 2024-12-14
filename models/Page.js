import mongoose from "mongoose";

const pageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, maxlength: 140 },
    slug: { type: String, required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    links: [{ type: mongoose.Schema.Types.ObjectId, ref: "Link" }],
    allowAnonymousMessages: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("Page", pageSchema);
