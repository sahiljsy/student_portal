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
      type: String
    },
    mimetype:{
      type:String
    },
    dueDate: {
        type: String,
        default:"No Due date"
    },
    points:{
        type: Number,
        default: 0
    },
    submissions:[{
      type: Mongoose.Schema.Types.ObjectId,
      ref: "Submission"
    }],
    subject:{
      type: Mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    }

  },
  {
    timestamps: true,
  }
);

const Assignment = Mongoose.model('Assignment', assignmentSchema);
export default Assignment;
