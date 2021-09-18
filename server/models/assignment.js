import Mongoose from "mongoose";

const assignmentSchema = new Mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    user: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    attchment: {
      type: File,
    },
    dueDate: {
        type: Date,
    },
    points:{
        type: Number,
        default: 100
    },

  },
  {
    timestamps: true,
  }
);

const Assignment = Mongoose.model('Assignment', assignmentSchema);
export default Assignment;
