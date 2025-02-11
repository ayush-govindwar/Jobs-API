const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')

const auth = (req, res,next )=>{
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new UnauthenticatedError('invalid token')
    }
    const token = authHeader.split(' ')[1]
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        //attach user to job routes
        req.user = {userId:payload.userId, name:payload.name} //payload generally contains userid or name therefore .userid
        next()
    } catch (error) {
        throw new UnauthenticatedError('invalid')
        
    }

}
module.exports = auth  