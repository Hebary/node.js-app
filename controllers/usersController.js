import User from "../models/users.js";
// import { Users } from '../DAOs/index.js';
import { createJWT } from "../helpers/createJWT.js";



export const createUser = async (req, res) => {
//evoit duplicated
    const { email } = req.body;
    const userExists = await User.findOne({ email }); 
    if (userExists) {
        const error = new Error(`The user ${email} already exists`);
        return res.status(400).send({ message:error.message});
    }
    try {
    //create new user and give it an ID
        const user = new User(req.body);
        await user.save();
        return res.status(200).json({msg:"User created successfully"});
    } catch (err) {
        console.log(err);
    }
}

export const login = async (req,res) => {
    const { email, password } = req.body;
    //verifying if user is already logged in 
    const user = await User.findOne({ email });
        if (!user) {
        const error = new Error(`User ${email} not found`);
        return res.status(404).send({ msg:error.message});
    }
    // verify password
    const matchPassword = await user.comparePassword(password);
    if(!matchPassword){
        const error = new Error(`Incorrect password`);
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

export const profile = async (req,res) => {
    const { user } = req ;
    res.json( user );
}
