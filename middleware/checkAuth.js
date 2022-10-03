//on this middleware : precheck user before request profile funct on userRoutes
const jwt = require("jsonwebtoken"); 
const User = require ("../models/users");

const checkAuth = async ( req, res, next ) =>{
    if(
        req.headers?.authorization  && 
        req.headers.authorization.startsWith('Bearer')
    ){
        try {
           const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select(
                "-password -token -__v"
            );

            return next();
        }catch(err){   
                return res.status(401).json({ msg: err.message });
            }
        }
    if(!req.headers.authorization){
        return res.status(401).json({ msg: "Yo have not the credentials" });
    }
    next();
}

module.exports = checkAuth;