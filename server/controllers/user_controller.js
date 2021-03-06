import User from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { transporter } from "../config/nodemailer.js";
import dotenv from 'dotenv';

dotenv.config();

const { verify } = jwt;

export const create = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      const { username, name, password, contact_no, email, role } = req.body;
      bcrypt.hash(password, 10).then((hash) => {
        User.create({
          name: name,
          username: username,
          password: hash,
          contact_no: contact_no,
          email: email,
          role: role,
        });
        transporter.sendMail(
          {
            from: " Student Portal "+process.env.EMAIL_USER,
            to: email,
            subject: "New Registration",
            html:`<h4> Welcom to Student Poratl</h4>`,
          },
          (err, info) => {
            if (err) {
              console.log("error in sending mail", err);
              return;
            }
          }
        );
        return res.send({ success: "User has Registerd now Login!!" });
      });
    } else {
      return res.send({ error: "User has already registerd" });
    }
  } catch (error) {
    // console.log(error.message);
    return res.send({ error: "Error in user creation" });
  }
};

export const update = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    // console.log(req.body.email)
    if (user) {
      // console.log(user);
      // console.log(contact_no);

      var data = {
        name: req.body.name,
        contact_no: req.body.contact,
        username: req.body.username,
      };

      const result = await User.updateOne({ email : req.body.email },{$set: data} );

      var send = {
        email : req.body.email,
        name: req.body.name,
        contact: req.body.contact,
        username: req.body.username,
      };

      return res.send({ success: "User updated!!",user: send });
    } else {
      return res.send({ error: "User not found" });
    }
  } catch (error) {
    // console.log(error.message);
    return res.send({ error: "Error in user updation." });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  // console.log(req.body);
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
      // console.log(token);
      res.cookie("studentportal", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });
      const userInfo = {
        username: user.username,
        id: user._id,
        role: user.role,
        name: user.name,
        email: user.email,
      };
      // console.log(res.locals);
      return res.send({
        accessToken: token,
        success: "Logged in Successfully!",
        user: userInfo,
      });
    });
  } catch (error) {
    console.log(error.message);
    return res.send({ error: "error in login" });
  }
};

export const info = async (req, res) => {
  let accessToken = req.header("accessToken");
  try {
    const validToken = verify(accessToken, process.env.KEY);
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
        contact: user.contact_no,
      };
      return res.send({ user: userInfo });
    } else {
      return res.send({ error: "Invalid Access!!" });
    }
  } catch (error) {
    // console.log(error);
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

export const getallusers = async (req, res) => {
  console.log("In user controller")
  try {
    // console.log(req.body.user);
    // console.log(typeof req.body.user)
    let identification = req.body.user
    let user = await User.findOne({ id : identification});
    // console.log(user)
    res.send(user);
  } catch (error) {
    // console.log(error.message);
    res.send({ error: "error in finding subjects" });
  }
};
