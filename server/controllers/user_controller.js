import User from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { transporter } from "../config/nodemailer.js";

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
            from: " Student Portal dummydevlop@gmail.com",
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
    console.log(error.message);
    return res.send({ error: "Error in user creation" });
  }
};

export const update = async (req, res) => {
  try {
    let user = await User.findOne({ username: req.body.username });
    // console.log(req.body.username)
    if (user) {
      console.log(user);
      // console.log(contact_no);
      console.log(req.body.contact_no);
      console.log(req.body.name);
      console.log(req.body.email);
      console.log(req.body.role);

      var data = {
        name: req.body.name,
        contact_no: req.body.contact_no,
        email: req.body.email,
      };
      const result = await User.updateOne(
        { username: req.body.username },
        { $set: data }
      );
      console.log(result);
      return res.send({ success: "User updated!!" });
    } else {
      return res.send({ error: "User not found" });
    }
  } catch (error) {
    console.log(error.message);
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
      // const accessToken = sign(
      //   { username: user.username, id: user.id },
      //   "sahil"
      // );

      // return res.send({ accessToken: accessToken, success: "Logged in Successfully!" });
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
      return res.send({ error: "Invalid Access!!" });
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
