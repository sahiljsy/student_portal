import Assignment from "../models/assignment.js";
import Submission from "../models/submission.js";

export const newSubmission = async (req, res) => {
  try {
    if (req.files != null) {
      var fl = req.files.file;
      let submission = {
        filename: fl.name,
        assignment_id: req.body.assignment_id,
        user: req.body.userid,
        mimetype: fl.mimetype,
      };
      fl.mv("public/submissions/" + fl.name, function (err) {
        if (err) {
          console.log(err);
        }
      });
      const sub = await Submission.create(submission);
      console.log(sub);
      if (sub) {
        Assignment.findByIdAndUpdate(req.body.assignment_id, {
          $push: { submissions: sub },
        }).exec((err, message) => {
          if (err) {
            console.log(err.message);
          }
          if (!message) {
            console.log("error duded");
          } else {
            return res.send({ success: "file submitted" });
          }
        });
      } else {
        return res.send({ error: "Unable to able to submit" });
      }
    }
  } catch (error) {
    console.log(error.message);
    return res.send({ error: "Internal server error" });
  }
};

export const checksubmission = async (req, res ) => {
    try {
        let assignment_id = req.body.assignment_id;
        let user_id = req.body.userid;
        let sub = await Submission.findOne({assignment_id: assignment_id, user:user_id});
        // console.log(req.body);
        // console.log(sub);
        if(sub){
            return res.send({name:sub.filename, success:"Submited"});
        }else{
            return res.send({error:"not submited"});
        }
    } catch (error) {
        console.log(error.message);
        return res.send({error:"not able to find submission"})
    }
}
