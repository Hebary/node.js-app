import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true,
        },
        email:{
            type:String,
            required:true,
            trim:true,
            unique:true
        },
        password:{
            type:String,
            required:true,
            trim:true,
        },
        token:{
            type: String
        }
        
    });

userSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10, (err, hash) => {

        if(!this.isModified("password")){
            next();
        } 
        
        if (err) {
            next(err);
        }

        this.password = hash;
        next();
    })
});

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', userSchema);

export default User;