import jwt from "jsonwebtoken";
import User from "../models/users.js";

const { verify } = jwt;

export const validateToken = async (req, res, next) => {
  try {
    const token = req.header("token");
    const validToken = verify(token, "sahil");
    if (!validToken) {
      res.send({error: "Inavlid Access"});
    }
    return next();
  } catch (error) {
    console.log(error.message);
    return res.send({ error: "Unauthorized user" });
  }
};

