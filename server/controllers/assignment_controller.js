import Assignment from '../models/assignment.js'

export const create =(req, res) => {
    try {
        var fl = req.files.attchment;
        console.log(req.body.title)
        fl.mv('public/assignment/' + fl.name, function (err) {
            if (err) {
                res.send({ error: err.message });
            }
            else {
                
                var insobj = {
                    type: req.body.type,
                    title: req.body.title,
                    description: req.body.description,
                    user : req.body.user,
                    dueDate: req.body.dueDate.toString(),
                    points: req.body.points,
                    attchment: fl.name
                };
                let asign =Assignment.create(insobj)

                if (asign) return res.send({ success: "Added To class" });
                else return res.send({ error: "Error in creation!!" });
            }
        })
        }
     catch (error) {
            return res.send({ error: "Inernal server error" });
        }
    };