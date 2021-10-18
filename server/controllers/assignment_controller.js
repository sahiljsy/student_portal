import Assignment from "../models/assignment.js";
import Subject from "../models/subject.js";
import { transporter } from "../config/nodemailer.js";
import Submission from "../models/submission.js";

export const create = async (req, res) => {
  let insobj;
  let emails;
  // console.log(req.body);
  try {
    if (req.files != null) {
      var fl = req.files.attchment;
      // console.log(req.files.attchment);
      const filename = fl.name;
      fl.mv("public/assignment/" + filename, function (err) {
        if (err) {
          console.log(err);
        }
      });
      insobj = {
        type: req.body.type,
        title: req.body.title,
        description: req.body.description,
        user: req.body.user,
        dueDate: req.body.dueDate.toString(),
        points: req.body.points,
        attchment: filename,
        mimetype: fl.mimetype,
      };
    } else {
      insobj = {
        type: req.body.type,
        title: req.body.title,
        description: req.body.description,
        user: req.body.user,
        dueDate: req.body.dueDate.toString(),
        points: req.body.points,
      };
    }
    // console.log(insobj);
    let asign = await Assignment.create(insobj);
    if (asign) {
      Subject.findByIdAndUpdate(req.body.subject_id, {
        $push: { attachments: asign },
      }).exec((err, message) => {
        if (err) {
          console.log(err.message);
        }
        if (!message) {
          console.log("error duded");
        }
      });
      try {
        let subject = await Subject.findById(req.body.subject_id).populate(
          "students"
        );
        if (subject) {
          emails = subject.students
            .map(function (s) {
              return s.email;
            })
            .toString();
          if (emails) {
            transporter.sendMail(
              {
                from: " Student Portal dummydevlop@gmail.com",
                to: emails,
                subject: `New ${asign.type}`,
                html: `<h4>New ${asign.type} for ${subject.title} </h4>
                      <h3> ${asign.title}</h3>
                      ${asign.description}`,
              },
              (err, info) => {
                if (err) {
                  console.log("error in sending mail", err);
                  return;
                } else {
                  // console.log(info)
                }
              }
            );
          }
        }
      } catch (error) {
        console.log(error.message);
      }
      // console.log("Assignment added.");
      return res.send({ success: "Assignment Added To class" });
    } else {
      // console.log("Error in assignment creation!!");
      return res.send({ error: "Error in assignment creation!!" });
    }
  } catch (error) {
    // console.log(error.message);
    return res.send({ error: "Internal server error." });
  }
};

export const getAllAttachment = async (req, res) => {
  try {
    let subject_id = req.body.subject;
    let subject = await Subject.findById(subject_id).populate({
      path: "attachments",
      options: { sort: { createdAt: -1 } },
    });
    if (subject) {
      let creator = await Subject.findById(subject_id).populate({
        path: "creator",
      });
      if (creator) {
        return res.send({
          subject: subject,
          creator: creator.creator.username,
        });
      } else {
        return res.send({ subject: subject });
      }
    } else {
      return res.send({ error: "unable to find subject" });
    }
  } catch (error) {
    console.log(error.message);

    return res.send({ error: "Internal server error" });
  }
};

export const getAttachment = async (req, res) => {
  try {
    let assignment_id = req.body.assignment_id;
    let assignment = await Assignment.findById(assignment_id).populate("user");
    let resData = {
      filename: assignment.attchment,
      createdAt: assignment.createdAt,
      creator: assignment.user.username,
      dueDate: assignment.dueDate,
      points: assignment.points,
      description : assignment.description,
    };
    if (assignment) {
      return res.send({ assignment: resData });
    } else {
      return res.send({ error: "unable to find Attachment" });
    }
  } catch (error) {
    // console.log(error.message);

    return res.send({ error: "Internal server error" });
  }
};


export const downloadFile = async (req, res) => {
  try {
    let assignmen = await Assignment.findById(req.params.id);
    // console.log(assignmen);
    res.set({
      "Content-Type": assignmen.mimetype,
    });
    return res.sendFile(assignmen.attchment, { root: "public/assignment/" });
  } catch (error) {
    // console.log(error.message);
    res.status(400).send({error:"Error while downloading file. Try again later."});
  }
};

export const deleteassignment= async (req, res) => {
  try {
    // console.log(req.body.assignment._id)
    let notices = await Assignment.deleteOne({_id: req.body.assignment._id})
    let sub = await Submission.deleteMany({assignment_id: req.body.assignment._id})
    // console.log("Deletes Sub")
    // console.log(sub)
    res.send({ success: "Deletion Successfull.!!"});
  } catch (error) {
    res.send({ error: "Unable to delete assignment" });
  }
};

export const getassignment= async (req, res) => {
  try {
    // console.log(req.body)
    let assignment = await Assignment.findOne({_id: req.body.assignment._id})
    // console.log(notices)
    res.send({ assignment});
  } catch (error) {
    res.send({ error: "Unable to Find assignment" });
  }
};