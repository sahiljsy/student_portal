import User from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const { verify } = jwt;

export const create = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      const { username, name, password, contact_no, email,role } = req.body;
      bcrypt.hash(password, 10).then((hash) => {
        User.create({
          name: name,
          username: username,
          password: hash,
          contact_no: contact_no,
          email: email,
          role: role
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

export const update = async (req, res) => {
  try {
    let user = await User.findOne({ username: req.body.username });
    console.log(req.body.username)
    if (user) {
      console.log(user)
      // console.log(contact_no);
      console.log(req.body.contact_no)
      console.log(req.body.name)
      console.log(req.body.email)
      console.log(req.body.role)
      
      var data = {
        name: req.body.name,
        contact_no: req.body.contact_no,
        email: req.body.email,
      };
      const result = await User.updateOne({ username : req.body.username },{$set: data} );
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
  const { sign } = jwt;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.send({ error: "invalid login" });
    }
    bcrypt.compare(password, user.password).then(async (match) => {
      if (!match) {
        return res.send({ error: "invalid login" });
      }
      const accessToken = sign(
        { username: user.username, id: user.id },
        "sahil"
      );

      return res.send({ accessToken: accessToken, success: "Logged in Successfully!" });
    });
  } catch (error) {
    console.log(error.message);
    return res.send({ error: "error in login" });
  }
};

export const info = async (req, res) => {
  let accessToken = req.header("accessToken");
  try {
    const validToken = verify(accessToken, "sahil");
    if (validToken) {
      const user = await User.findById(validToken.id);
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
