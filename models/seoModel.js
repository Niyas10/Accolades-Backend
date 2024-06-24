import mongoose from "mongoose";

const seoSchema = mongoose.Schema(
  {
    seoName: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    isListed: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Seo", seoSchema);
