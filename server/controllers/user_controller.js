import User from "../models/users.js";

export const create = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      let user = await User.create(req.body);
      return res.send({ message: "User has Registerd now Login!!" });
    } else {
      return res.send({ message: "User has already registerd" });
    }
  } catch (error) {
    console.log(error.message);
    return res.send("error in creating user");
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user && user.password == password) {
      res.send({ message: "loggedin sucessfully", user: user });
    } else {
      res.send({ message: "invalid login" });
    }
  } catch (error) {
    console.log(error.message);
    res.send({ message: "error in login" });
  }
};
