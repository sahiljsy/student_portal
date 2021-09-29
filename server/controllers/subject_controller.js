import Subject from "../models/subject.js";
import RandTokenGenerator from "rand-token";
import User from "../models/users.js";

export const create = async (req, res) => {
  const code = RandTokenGenerator.generate(7);

  try {
    const subject = {
      title: req.body.title,
      credit: req.body.credit,
      creator: req.body.userid,
      classCode: code,
    };
    const newSubject = await Subject.create(subject);
    if (newSubject) {
      User.findByIdAndUpdate(req.body.userid, {
        $push: { subjects: newSubject },
      }).exec((err, message) => {
        if (err) {
          console.log(err.message);
        }
        if (!message) {
          console.log("error duded");
        } else {
          // console.log("user updated");
        }
      });
      return res.send({ success: "Subject created!" });
    } else {
      return res.send({ error: "Error in Subject creation!!" });
    }
  } catch (error) {
    res.send({ error: "Inernal server error" });
    console.log(error.message);
  }
};

export const addStudent = async (req, res) => {
  try {
    const { classCode, userid } = req.body;
    let subject = await Subject.findOne({ classCode: classCode })
      if (subject) {
        let sub = subject;
        if (sub.students.includes(userid) || userid == sub.creator) {
          return res.send({ success: "You have joined this class already" });
        } else {
          Subject.findOneAndUpdate(
            { classCode: classCode },
            { $push: { students: userid } }
          ).exec((err, message) => {
            if (err) {
              console.log(err.message);
              return res.send({ error: "Error in joing class" });
            }
            if (!message) {
              return res.send({ error: "YOU CAN NOT JOIN CLASS" });
            } else {
              User.findByIdAndUpdate(req.body.userid, {
                $push: { subjects:sub},
              }).exec((err, message) => {
                if (err) {
                  console.log(err.message);
                }
                if (!message) {
                  console.log("error duded");
                } else {
                  // console.log("user updated");
                }
              });
              return res.send({ success: `You have join class ${sub.title}` });
            }
          });
        }
      } else {
        return res.send({ error: "Invalid class code" });
      }
  } catch (error) {
    console.log(error.message);
    return res.send({ error: "Error in class Joining!!" });
  }
};

