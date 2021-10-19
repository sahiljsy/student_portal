import Assignment from "../models/assignment.js";
import Submission from "../models/submission.js";

export const newSubmission = async (req, res) => {
  // console.log("In newSubmission function");
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
      // console.log(sub);
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
    // console.log(error.message);
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

export const getallsubmission = async (req, res ) => {
  // console.log("Hii");
  try {
      let assignment_id = req.body.assignment_id;
      // console.log(assignment_id);
      // let user_id = req.body.userid;
      let sub = await Submission.find({assignment_id: assignment_id}).populate({path: "user"});
      // console.log(req.body);
      //  console.log(sub);
      if(sub){
        
          return res.send({submissions:sub});
      }else{
          return res.send({error:"not submited"});
      }
  } catch (error) {
      console.log(error.message);
      return res.send({error:"not able to find submission"})
  }
}

export const downloadFile = async (req, res) => {
  // console.log("In submission controller")
  try {
    // console.log(req.params.id)
    let assignmen = await Submission.findById(req.params.id);
    // console.log(assignmen);
    res.set({
      "Content-Type": assignmen.mimetype,
    });
    return res.sendFile(assignmen.filename, { root: "public/submissions/" });
  } catch (error) {
    // console.log(error.message);
    res.status(400).send({error:"Error while downloading file. Try again later."});
  }
};