import  Mongoose  from "mongoose";

const submissionSchema = new Mongoose.Schema({
    filename:{
        type:String
    },
    assignment_id:{
        type:Mongoose.Schema.Types.ObjectId,
        ref: "Assignment"
    },
    user:{
        type:Mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    mimetype:{
        type:String
    }
})


// const Assignment = Mongoose.model('Assignment', assignmentSchema);
// export default Assignment;

const Submission = Mongoose.model('Submission', submissionSchema);
export default Submission;