import Subject from "../models/subject.js";
import RandTokenGenerator from "rand-token";
export const create = async (req, res) => {
  const code = RandTokenGenerator.generate(7);

  try {
    const subject = {
      title: req.body.title,
      credit: req.body.credit,
      creator: req.body.userid,
      classCode: code,
    };
    // console.log(subject);
    const newSubject = await Subject.create(subject);
    if (newSubject) return res.send({ success: "Subject created!" });
    else return res.send({ error: "Error in Subject creation!!" });
  } catch (error) {
    res.send({ error: "Inernal server error" });
    console.log(error.message);
  }
};

export const addStudent = async (req, res) => {
  try {
    const { classCode, userid } = req.body;
    Subject.findOne({ classCode: classCode }, (err, subject) => {
      if (err) {
        console.log(err.message);
      }
      if (subject) {
        let sub = subject;
        // console.log(sub.title);
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
              return res.send({ success: `You have join class ${sub.title}` });
            }
          });
        }
      } else {
        return res.send({ error: "Invalid class code" });
      }
    });
  } catch (error) {
    console.log(error.message);
    return res.send({ error: "Error in class Joining!!" });
  }
};
