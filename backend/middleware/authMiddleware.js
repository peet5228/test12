const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

exports.verifyToken = (req,res,next) => {
    const authHeader = req.header("Authorization")
    if(!authHeader || !authHeader.startsWith("Bearer ")) return rers.status(401).json({message:'Invalid no or token'})
    // const token = 
}