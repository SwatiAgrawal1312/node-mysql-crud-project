const jwt=require("jsonwebtoken");
const verifyToken=(req,res,next)=>{
    const token=req.headers.authorization;
    if(! token|| !token.startWith("Bearer ")){
        return res.status(401).send({
            success:false,
            message:"Unauthorized: token missing"
        })

    }
    const jwtToken=token.split(" ")[1];
    try{
        const decoded=jwt.verify(jwtToken,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    }catch(err){
        return res.status(401).json({
            success:false,
            message:'Invalid token',
        })
    }
};
module.exports={verifyToken};