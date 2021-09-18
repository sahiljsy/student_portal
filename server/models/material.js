import Mongoose from "mongoose";

const materialSchema = new Mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    user: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    attchment: {
      type: File,
    },
  },
  { timestamps: true }
);

const Material = Mongoose.model("Matreial", materialSchema);
export default Material;
