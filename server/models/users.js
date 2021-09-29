import Mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new Mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    contact_no: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      default: "student",
      required: true,
    },
    subjects: [
      {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "Subject",
      },
    ],
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, "sahil");
    this.tokens = this.tokens.concat({token:token});
    await this.save();
    return token;
  } catch (error) {
    console.log(error.message);
  }
};

const User = Mongoose.model("User", userSchema);
export default User;
