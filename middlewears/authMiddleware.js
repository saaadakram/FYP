const jwt=require("jsonwebtoken")

const VerifyToken=async(req,res,next)=>{
try {
    const token = req.headers.authorization?.split(' ')[1]
    if(!token){
        return res.status(401).send({success:false, Message:"Token Is Required"})
    }
    
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    req.body.userId = decode.id
    next()

} catch (error) {
    console.log("Token verification error:", error.message)
    return res.status(401).send({success:false, Message:"Invalid Token", error:error.message})
}
}

module.exports= {VerifyToken}