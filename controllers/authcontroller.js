const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const login=async(req,res)=>{
    try{
        const {username,password}=req.body;
        if (!username || !password){
            return res.status(400).send({
                success:false,
                message:"plz provide username and password"
        
            })
        }
        // if user exists
        const [userResult]=await db.query('select * from students where username=?',[username]);
         if(!data){
            return res.status(401).send({
                success:false,
                message:'Invalid username or password'
            })
         }
        const user=userResult[0]
    
    // compare hashed passwords
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(401).send({
            success:false,
            message:'Invalid username or password'
        })
    }
    //3.Generate JWT token
    const token=jwt.sign(
        {
            id:user.id,
        username:user.username
    },process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES

    

    });
    res.status(200).send({
        success:true,
        message:'login successfull',
        token,
    });
    
    
    
    
        }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"login failed",error
        })

    }
}
module.exports={login}
