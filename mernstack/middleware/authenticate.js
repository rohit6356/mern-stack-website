const jwt = require('jsonwebtoken')
const user = require('../model/userSchema')

const authenticate = async (req ,res ,next) =>{
try {

const token = req.cookies.jwtoken;
const verifyToken = jwt.verify(token , process.env.SECRET)
const rootUser = await user.findOne({_id:verifyToken._id , "tokens.token":token})
if(!rootUser){throw new Error("user not found")}

req.token = token;
req.rootUser = rootUser;
req.userID = rootUser._id;
next();

    
} catch (error) {
    res.status(401).send(error)
}
}

module.exports = authenticate;