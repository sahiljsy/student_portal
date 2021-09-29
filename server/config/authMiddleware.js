import jwt from "jsonwebtoken";
import User from "../models/users.js";

const { verify } = jwt;

export const validateToken = async (req, res, next) => {
  try {
    const token = req.cookies.studentportal;
    console.log(token);
    const validToken = verify(token, "sahil");
    const user = await User.findOne({ _id: validToken._id, "tokens.token": token });
    // const accessToken = req.header("accessToken");
    // if (!accessToken) {
    //   return res.json({ error: "Please Login first" });
    // }

    // const validToken = verify(accessToken, "sahil");
    if (!user) {
      throw new Error("User not found");
    }
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
      console.log(error.message);
    res.status(401).send({ error: "Unauthorized user" });
  }
};
