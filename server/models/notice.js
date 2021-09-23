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
    userid: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "User",
      required:true
    },
    attchment:{
        type:String
    }
  },
  {
    timestamps: true,
  }
);

const Notice = Mongoose.model("Notice", noticeSchema);
export default Notice;
