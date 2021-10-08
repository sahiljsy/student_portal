import Notice from "../models/notice.js";
import User from "../models/users.js";
import { transporter } from "../config/nodemailer.js";

export const create = async (req, res) => {
  try {
    const notice = {
      title: req.body.title,
      content: req.body.content,
      userid: req.body.userid,
    };
    let notic = await Notice.create(notice);
    let creator = await User.findById(notice.userid);
    let user = await User.find({ role: "student" });
    var emails = user.map(function(u){return u.email;}).toString();
    if (notic) {
      try {
        transporter.sendMail(
          {
            from: " Student Portal dummydevlop@gmail.com",
            to: emails,
            subject: "New Notice",
            html: `<h4>${creator.name} posted new notice </h4>
                    <h3> ${notice.title}</h3>
                    ${notice.content}`,
          },
          (err, info) => {
            if (err) {
              console.log("error in sending mail", err);
              return;
            }else{
              // console.log(info)
            }
          }
        );
      } catch (error) {
        console.log(error.message);
      }
      return res.send({ success: "Notice Posted!" });
    } else {
      return res.send({ error: "Error in Notice creation!!" });
    }
  } catch (error) {
    console.log(error.message);
    return res.send({ error: "Inernal server error" });
  }
};

export const getAll = async (req, res) => {
  try {
    let notices = await Notice.find({}).sort("-createdAt").populate("userid");
    // console.log(notices)
    res.send({ notices: notices });
  } catch (error) {
    res.send({ error: "Unable to fetch notices" });
  }
};
