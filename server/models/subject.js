import Mongoose from "mongoose";

const subjectSchema = new Mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    creator: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "User",
      required:true
    },
    classCode: {
      type: String,
      maxlength:7,
      required: true
    },
    credit: {
      type: Number,
      required: true,
    },
    students: [
      {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    attachments: [
      {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "Assignment",
      },
    ],
  },
  { timestamps: true }
);

const Subject = Mongoose.model("Subject", subjectSchema);
export default Subject;
