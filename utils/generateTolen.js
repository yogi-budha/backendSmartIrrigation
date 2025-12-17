import jwt from "jsonwebtoken"

export const generateToken =  (user,res,message)=>{
    const token =  jwt.sign({userId:user._id},process.env.SECREAT_KEY,{
        expiresIn:"1d"
    })

    res.status(200).cookie("token",token,{
        httpOnly:true,
        sameSite:"strict",
        maxAge:24*60*60*1000
    }).json({
        success:true,
        message,
        user
    })
    

}