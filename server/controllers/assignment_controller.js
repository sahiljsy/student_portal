import Assignment from '../models/assignment.js'

export const create = async (req, res) => {


    try {
        console.log(req.files)
        let insobj;
        if (req.files != null) {
            var fl = req.files.attchment;
            fl.mv('public/assignment/' + fl.name, function (err) {
                if (err) {
                    return res.send({ error: "No file Uploaded!!" });
                }
            })
            insobj = {
                type: req.body.type,
                title: req.body.title,
                description: req.body.description,
                user: req.body.user,
                dueDate: req.body.dueDate.toString(),
                points: req.body.points,
                attchment: fl.name
            };
        }
        else {
            insobj = {
                type: req.body.type,
                title: req.body.title,
                description: req.body.description,
                user: req.body.user,
                dueDate: req.body.dueDate.toString(),
                points: req.body.points,
            };
        }
            let asign = await Assignment.create(insobj)

            if (asign) {
                console.log("Assignment added.")
                return res.send({ success: "Assignment Added To class" });
            }
            else {
                console.log("Error in assignment creation!!");
                return res.send({ error: "Error in assignment creation!!" });
            }
    }
    catch (error) {
        return res.send({ error: "Internal server error." });
    }
};