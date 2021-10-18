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
    // console.log(error.message);
  }
};

export const update = async (req, res) => {

  try {
    // console.log("hii")
    let clss = await Subject.findOne({ classCode: req.body.classCode });
    // console.log(req.body.classCode)
    if (clss) {
      
      var data = {
        title: req.body.title,
        credit: req.body.credit,
      };
      const result = await Subject.updateOne({ classCode: req.body.classCode }, { $set: data });
      // console.log(result);
      return res.send({ success: "Class details updated!!" });
    } else {
      return res.send({ error: "Class Not found" })
    }

  } catch (error) {
    // console.log(error.message);
    return res.send({ error: "Error in class updation" });
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
              // console.log(err.message);
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
    // console.log(error.message);
    return res.send({ error: "Error in class Joining!!" });
  }
};

export const getStudents = async (req, res) =>{
  try {
    // console.log(req.body);
    let subject_id = req.body.subject;
    let subject = await Subject.findById(subject_id).populate({
      path:"students"
    });
    // console.log(subject);
    if(subject){
      var sub = {
        title :subject.title,
        classCode :subject.classCode,
        credit :subject.credit
      } 
      return res.send({
        subject: sub,
        students: subject.students
      });
    }else{
      return res.send({error:"subject not found"});
    }
    
  } catch (error) {
    // console.log(error.message);
    return res.send({error:"Unable to find students"})
  }
}


