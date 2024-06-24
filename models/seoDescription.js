import mongoose from "mongoose";

const seoDescriptionSchema = new mongoose.Schema(
  {
    titleOne: {
      type: String,
      required: true,
    },
    titleOneDescription: {
      type: String,
      required: true,
    },
    titleTwo: {
      type: String,
      required: true,
    },
    titleTwoDescription: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Description", seoDescriptionSchema);
