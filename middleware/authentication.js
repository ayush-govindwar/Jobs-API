const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')

const auth = (req,res)=>{
    const authHeader = req.header.authorization
    if(!authHeader || !authHeader.startswith('Bearer')){
        throw new UnauthenticatedError('invalid')
    }
    const token = authHeader.split(' ')[1]
    try {
        const payload = jwt.verify(token, process.env.JWT_SECET)
        //attach user to job routes
        req.user = {userId:payload.userId, name:payload.name} //payload generally contains userid or name therefore .userid
    } catch (error) {
        throw new UnauthenticatedError('invalid')
        
    }

}
module.exports = auth  