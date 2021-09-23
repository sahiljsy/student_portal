import  jwt  from "jsonwebtoken";

const {verify} = jwt;

export const validateToken = (req, res, next) =>{
    const accessToken = req.header('accessToken');
    if(!accessToken){
        return res.json({error:"Please Login first"});
    }
    try {
        const validToken = verify(accessToken, "sahil");
        if(validToken){
            return next();
        }
        
    } catch (error) {
        return res.json({error: error});
    }

}
