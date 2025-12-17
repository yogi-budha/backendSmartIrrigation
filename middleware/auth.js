
import jwt from 'jsonwebtoken'

export const isAuth = async(req,res,next)=>{

    try {
        const token = req.cookies.token
        if(!token){
            return res.status(401).json({
                success:false,
                message:"UnAuthorized"
            })
        }
        const decode = await jwt.verify(token,process.env.SECREAT_KEY)

        if(!decode){
            return res.status(401).json({
                success:false,
                message:"UnAuthorized"
            })
        }
        req.userId = decode.userId
        next()
        
    } catch (error) {
        console.log(error)
    }
}