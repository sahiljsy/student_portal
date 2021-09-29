import User from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const { verify } = jwt;

export const create = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      const { username, name, password, contact_no, email } = req.body;
      bcrypt.hash(password, 10).then((hash) => {
        User.create({
          name: name,
          username: username,
          password: hash,
          contact_no: contact_no,
          email: email,
        });
        return res.send({ success: "User has Registerd now Login!!" });
      });
    } else {
      return res.send({ error: "User has already registerd" });
    }
  } catch (error) {
    console.log(error.message);
    return res.send({ error: "Error in user creation" });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  const { sign } = jwt;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.send({ error: "user not found" });
    }
    bcrypt.compare(password, user.password).then(async (match) => {
      if (!match) {
        return res.send({ error: "invalid login" });
      }
      const token = await user.generateAuthToken();
      console.log(token);
      res.cookie("studentportal", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });
      
      console.log(res.locals);
      return res.send({
        accessToken: token,
        success: "Logged in Successfully!",
        role: user.role,
      });
    });
  } catch (error) {
    console.log(error.message);
    return res.send({ error: "error in login" });
  }
};

// export const info = async (req, res) => {
//   // console.log(req.user);
//   const userInfo = {
//     username: req.user.username,
//     id: req.user._id,
//     role: req.user.role,
//     name: req.user.name,
//     email: req.user.email,
//     subject: req.user.subjects,
//     contact_no: req.user.contact_no
//   };
//   console.log(userInfo);
//   return res.send({ user: userInfo });
// };
export const info = async (req, res) => {
  let accessToken = req.header("accessToken");
  try {
    const validToken = verify(accessToken, "sahil");
    if (validToken) {
      const user = await User.findById(validToken._id);
      if (!user) {
        return res.send({ error: "Invalid user" });
      }
      const userInfo = {
        username: user.username,
        id: user._id,
        role: user.role,
        name: user.name,
        email: user.email,
      };
      return res.send({ user: userInfo });
    } else {
    }
  } catch (error) {
    console.log(error);
    return res.json({ error: error });
  }
};

export const getMySubject = async (req, res) => {
  try {
    let user = await User.findById(req.body.userid).populate({
      path: "subjects",
      options: { sort: { createdAt: -1 } },
    });
    let mysubject = user.subjects;
    res.send({ mysubject: mysubject });
  } catch (error) {
    // console.log(error.message);
    res.send({ error: "error in finding subjects" });
  }
};
