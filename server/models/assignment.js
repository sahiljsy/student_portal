import Mongoose from "mongoose";

const assignmentSchema = new Mongoose.Schema(
  {
    type: {
      type:String,
      required: true,
    },
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
      type: String,
      contentType: String,
    },
    dueDate: {
        type: String,
    },
    points:{
        type: Number,
        default: 0
    },

  },
  {
    timestamps: true,
  }
);

const Assignment = Mongoose.model('Assignment', assignmentSchema);
export default Assignment;
