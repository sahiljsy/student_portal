import Notice from "../models/notice.js";

export const create = async (req, res) => {
  try {
    const notice = {
      title: req.body.title,
      content: req.body.content,
      userid: req.body.userid,
    };
    // console.log(notice)
    let notic = await Notice.create(notice);
    // console.log(notic);
    if (notic) return res.send({ success: "Notice Posted!" });
    else return res.send({ error: "Error in Notice creation!!" });
  } catch (error) {
    return res.send({ error: "Inernal server error" });
  }
};

export const getAll = async (req, res) =>{
  try {
    let notices = await Notice.find({}).sort('-createdAt').populate("userid");
    // console.log(notices)
    res.send({notices:notices});
    
  } catch (error) {
    res.send({error:"Unable to fetch notices"})
  }
}
