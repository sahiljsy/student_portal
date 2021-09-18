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
    },
    classCode: {
      type: String,
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
  },
  { timestamps: true }
);
