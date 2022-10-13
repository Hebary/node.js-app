const Users = require('../models/users');
const createJWT =require ("../helpers/createJWT");
const logger = require('../config/logger');
const { emailRegistry } = require('../helpers/sendEmail');



 const createUser = async (req, res) => {
//evoit duplicated
    const { email } = req.body;
    const userExists = await Users.findOne({ email }); 
    if (userExists) {
        const error = new Error(`The user ${email} already exists`);
        return res.status(400).send({ message:error.message});
    }
    try {
    //create new user and give it an ID
        const user = new Users(req.body);
        await user.save();
                //send email with token
                emailRegistry({
                    email:user.email,
                    name:user.name,
                    token:user.token,
                    address:user.address,
                    phone:user.phone,
                    file:user.file
                });
                return  res.status(200).json({msg:"User created successfully, check your email to confirm your account"});
    } catch (err) {
        console.log(err);
        logger.error("Error creating user: " + err);
    }
}

 const login = async (req,res) => {
    const { email, password } = req.body;
    //verifying if user is already logged in 
    const user = await Users.findOne({ email });
        if (!user) {
        const error = new Error(`User ${email} not found`);
        logger.error(error.message);
        return res.status(404).send({ msg:error.message});
    }
    // verify password
    const matchPassword = await user.comparePassword(password);
    if(!matchPassword){
        const error = new Error(`Incorrect password`);
        logger.error(error.message);
        return res.status(401).send({ msg:error.message});
    }else{
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token: createJWT(user._id)
        });
    }
}

 const profile = async (req,res) => {
    const { user } = req ;
    res.json( user );
}

module.exports = {
    createUser,
    login,
    profile
}
