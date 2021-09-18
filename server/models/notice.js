import Mongoose from "mongoose";

const noticeSchema = new Mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    user: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    attchment:{
        type:File
    }
  },
  {
    timestamps: true,
  }
);

const Notice = Mongoose.model("Notice", noticeSchema);
export default Notice;
